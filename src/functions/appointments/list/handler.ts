import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initializePrisma } from "../../../utils/prisma";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { calculatePages } from "../../../utils/functions";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { headers, queryStringParameters } = event;
    const { user_id } = headers || {};
    const { page = 1, limit = 10 } = queryStringParameters || {};

    const appointments = await prisma.appointment.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: {
        OR: [
          {
            student_id: Number(user_id),
          },
          {
            tutor_id: Number(user_id),
          },
        ],
      },
      select: {
        created_at: true,
        date: true,
        id: true,
        mentorship: {
          select: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        tutor: {
          select: {
            id: true,
            name: true,
          },
        },
        status: {
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
    });

    const count = await prisma.appointment.count({
      where: {
        OR: [
          {
            student_id: Number(user_id),
          },
          {
            tutor_id: Number(user_id),
          },
        ],
      },
    });

    const pages = calculatePages(count, Number(limit), Number(page));

    return Responses._200({ data: appointments, count, pages });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")] });
  }
};

export const list = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
]);
