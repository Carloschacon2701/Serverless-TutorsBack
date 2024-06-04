import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { object, string } from "yup";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";

const i18nString = (key: string) =>
  i18n.t("Mentorship.find.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();

    const { id } = event.pathParameters ?? {};

    const mentorship = await prisma.mentorship.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        subject: true,
        currency: true,
        tutor: true,
        work_days: true,
      },
    });

    if (!mentorship) {
      return Responses._404({
        message: i18nString("mentorshipNotFound"),
      });
    }

    return Responses._200({ data: mentorship });
  } catch (error) {
    console.error(error);
    return Responses._500({ message: i18n.t("internalServerError"), error });
  }
};

export const find = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    pathParameters: object({
      id: string().required(i18nString("idRequired")),
    }),
  }),
]);
