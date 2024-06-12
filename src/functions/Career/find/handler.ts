import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";

const i18nString = (key: string) => i18n.t("Career.find." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters } = event;
    const { career_id = 0 } = pathParameters || {};

    const career = await prisma.career.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!career)
      return Responses._404({
        errors: [i18nString("validations.careerNotFound")],
      });

    return Responses._200({ data: career });
  } catch (error) {
    console.error(error);
    return Responses._500({ errors: ["internalServerError"], error });
  }
};

export const find = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
