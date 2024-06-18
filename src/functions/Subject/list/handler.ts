import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { Prisma } from "@prisma/client";
import { calculatePages } from "../../../utils/functions";

// const i18nString = (key: string) => i18n.t("Subject.find." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { queryStringParameters } = event;
    const {
      category = undefined,
      name = undefined,
      page = 1,
      limit = 10,
    } = queryStringParameters || {};

    let whereClause: Prisma.SubjectWhereInput = {};

    if (category) {
      whereClause = {
        category_id: Number(category),
      };
    }

    if (name) {
      whereClause = {
        ...whereClause,
        name: {
          startsWith: name + "%",
        },
      };
    }

    const subjects = await prisma.subject.findMany({
      where: whereClause,
      select: {
        name: true,
        id: true,
        Category: {
          select: {
            name: true,
            id: true,
          },
        },
        _count: {
          select: { Document: true },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const count = await prisma.subject.count({
      where: whereClause,
    });

    const pages = calculatePages(count, Number(limit), Number(page));

    return Responses._200({ data: subjects, count, pages });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
