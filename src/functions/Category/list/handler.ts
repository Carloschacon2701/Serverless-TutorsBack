import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { initializePrisma } from "../../../utils/prisma";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { name = undefined } = event?.queryStringParameters || {};
    const whereClause = name ? { name: { startsWith: name + "%" } } : {};

    const categories = await prisma.category.findMany({
      where: whereClause,
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

    return Responses._200({ data: categories, count });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
