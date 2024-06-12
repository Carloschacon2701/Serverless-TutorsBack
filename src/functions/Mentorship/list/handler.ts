import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import { schemaValidator } from "../../../libs/lambda";
import { number, object } from "yup";
import { Prisma } from "@prisma/client";
import { calculatePages } from "../../../utils/functions";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const {
      tutor,
      category,
      subject,
      page = 1,
      limit = 10,
    } = event.queryStringParameters ?? {};

    let whereClause: Prisma.MentorshipWhereInput = {};

    if (tutor) {
      whereClause.tutor_id = Number(tutor);
    }

    if (category) {
      whereClause.category_id = Number(category);
    }

    if (subject) {
      whereClause.subject_id = Number(subject);
    }

    const mentorship = await prisma.mentorship.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: whereClause,
      include: {
        subject: true,
        currency: true,
        tutor: true,
        work_days: true,
      },
    });

    const count = await prisma.mentorship.count({
      where: whereClause,
    });

    const pages = calculatePages(count, Number(limit), Number(page));

    return Responses._200({ data: mentorship, count, pages });
  } catch (error) {
    console.error(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    queryStringParameters: object({
      tutor: number().optional(),
      category: number().optional(),
      subject: number().optional(),
      page: number().optional(),
      limit: number().optional(),
    }),
  }),
]);
