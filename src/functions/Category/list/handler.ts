import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { initializePrisma } from "../../../utils/prisma";
import { calculatePages } from "../../../utils/functions";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { queryStringParameters } = event;
    const { page = 1, limit = 10 } = queryStringParameters || {};

    const categories = await prisma.category.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      select: {
        name: true,
        id: true,
        _count: {
          select: {
            Subject: true,
          },
        },
      },
    });

    const count = await prisma.category.count();

    const pages = calculatePages(count, Number(limit), Number(page));

    return Responses._200({ data: categories, count, pages });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
