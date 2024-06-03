import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { array, mixed, number, object } from "yup";
import { initializePrisma } from "../../../utils/prisma";
import { Roles } from "../../../utils/enums";
import { MentorshipCreation } from "../../../utils/Interfaces/Config";

const i18nString = (key: string, options?: object) =>
  i18n.t("Mentorship.create.validations." + key, { ...options });

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const body = event.body as unknown as MentorshipCreation;
    const { work_days, subject_id, tutor_id, currency_id, hourly_price } = body;

    const existingSubject = await prisma.subject.findUnique({
      where: {
        id: subject_id,
      },
    });

    if (!existingSubject) {
      return Responses._404({ message: i18nString("subjectNotFound") });
    }

    const existingTutor = await prisma.user.findUnique({
      where: {
        id: tutor_id,
        role_id: Roles.Tutor,
      },
    });

    if (!existingTutor) {
      return Responses._404({ message: i18nString("tutorNotFound") });
    }

    const existingMentorship = await prisma.mentorship.findFirst({
      where: {
        tutor_id: tutor_id,
        subject_id: subject_id,
      },
    });

    if (existingMentorship) {
      return Responses._400({
        message: i18nString("mentorshipAlreadyExists", {
          subject_name: existingSubject.name,
        }),
      });
    }

    const existingCurrency = await prisma.currency.findUnique({
      where: {
        id: currency_id,
      },
    });

    if (!existingCurrency) {
      return Responses._404({ message: i18nString("currencyNotFound") });
    }

    const newMentorship = await prisma.mentorship.create({
      data: {
        hourly_price,
        work_days: {
          connect: work_days.map((day: number) => ({
            id: day,
          })),
        },
        subject_id,
        category_id: existingSubject.category_id,
        tutor_id,
        currency_id,
      },
    });

    return Responses._200({
      message: i18n.t("Mentorship.create.success"),
      data: newMentorship,
    });
  } catch (error) {
    console.log("Error creating mentorship", error);

    return Responses._500({
      message: i18n.t("internalServerError"),
      error: error,
    });
  }
};

export const create = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      work_days: array().of(
        mixed()
          .oneOf([1, 2, 3, 4, 5, 6, 7])
          .required(() => i18nString("workDaysRequired"))
      ),
      subject_id: number()
        .positive()
        .required(() => i18nString("subjectIdRequired")),
      tutor_id: number()
        .positive()
        .required(() => i18nString("tutorIdRequired")),
      currency_id: number()
        .positive()
        .required(() => i18nString("currencyIdRequired")),
      hourly_price: number()
        .positive()
        .required(() => i18nString("hourlyPriceRequired")),
    }),
  }),
]);
