import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { queryStringParameters } = _event;
    const { page = 1, limit = 10 } = queryStringParameters || {};

    const careers = await prisma.career.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const count = await prisma.career.count();

    return Responses._200({ data: careers, count });
  } catch (error) {
    console.log(error);

    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
