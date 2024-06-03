import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import { schemaValidator } from "../../../libs/lambda";
import { number, object } from "yup";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const {
      tutor = 0,
      category = 0,
      subject = 0,
    } = event.queryStringParameters ?? {};

    const config = await prisma.config.findMany({
      where: {
        tutor_id: tutor ? { equals: Number(tutor) } : undefined,
        category_id: category ? { equals: Number(category) } : undefined,
        subject_id: subject ? { equals: Number(subject) } : undefined,
      },
    });

    return Responses._200(config);
  } catch (error) {
    console.error(error);
    return Responses._500({ message: i18n.t("internalServerError"), error });
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
    }),
  }),
]);
