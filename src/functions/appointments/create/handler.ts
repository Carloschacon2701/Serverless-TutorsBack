import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { date, number, object } from "yup";
import { ConsultacyCreation } from "../../../utils/Interfaces/Consultancies";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";

const i18nString = (key: string) => i18n.t("Consultancy.validation." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body as unknown as ConsultacyCreation;
    const prisma = initializePrisma();
    const { mentorship = 0, date = "" } = body;

    const student = 0;

    const existingMentorship = await prisma.mentorship.findUnique({
      where: {
        id: mentorship,
      },
    });

    if (!existingMentorship) {
      return Responses._400({
        message: i18nString("mentorshipNotFound"),
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        tutor_id: existingMentorship.tutor_id,
        mentorship_id: mentorship,
        student_id: student,
      },
      include: {
        mentorship: true,
        student: true,
        tutor: true,
      },
    });

    return Responses._201({ data: appointment });
  } catch (error) {
    console.log(error);
    return Responses._500({ message: i18n.t("internalServerError"), error });
  }
};

export const create = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      mentorship: number().required(),
      date: date().required(),
    }),
  }),
]);
