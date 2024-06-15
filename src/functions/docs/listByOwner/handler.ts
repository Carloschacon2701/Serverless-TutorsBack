import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import i18n from "../../../libs/i18n";
import { calculatePages } from "../../../utils/functions";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { queryStringParameters, pathParameters } = event;
    const { limit = 10, page = 1 } = queryStringParameters || {};
    const { owner_id = 0 } = pathParameters || {};

    const list = await prisma.document.findMany({
      where: {
        created_by: Number(owner_id),
      },
      select: {
        category_id: true,
        id: true,
        name: true,
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const count = await prisma.document.count({
      where: {
        created_by: Number(owner_id),
      },
    });

    const pages = calculatePages(count, Number(limit), Number(page));

    return Responses._200({ data: list, count, pages });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([i18nMiddleware()]);
