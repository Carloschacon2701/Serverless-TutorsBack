import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters } = event;
    const { category_id = 0 } = pathParameters || {};

    const category = await prisma.category.findUnique({
      where: {
        id: Number(category_id),
      },

      include: {
        Subject: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return Responses._200({ data: category });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const find = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
