import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { array, mixed, number, object } from "yup";
import { initializePrisma } from "../../../utils/prisma";
import { MentorshipCreation } from "../../../utils/Interfaces/Mentorship";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { Roles } from "../../../utils/enums";

const i18nString = (key: string, options?: object) =>
  i18n.t("Mentorship.create.validations." + key, { ...options });

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { body, headers } = event;
    const { user_id } = headers;
    const { work_days, subject_id, currency_id, hourly_price, capacity } =
      body as unknown as MentorshipCreation;

    const existingSubject = await prisma.subject.findUnique({
      where: {
        id: subject_id,
      },
    });

    if (!existingSubject) {
      return Responses._404({ errors: [i18nString("subjectNotFound")] });
    }

    const existingMentorship = await prisma.mentorship.findFirst({
      where: {
        tutor_id: Number(user_id),
        subject_id: subject_id,
        active: true,
      },
    });

    if (existingMentorship) {
      return Responses._400({
        errors: [
          i18nString("mentorshipAlreadyExists", {
            subject_name: existingSubject.name,
          }),
        ],
      });
    }

    const existingCurrency = await prisma.currency.findUnique({
      where: {
        id: currency_id,
      },
    });

    if (!existingCurrency) {
      return Responses._404({ errors: [i18nString("currencyNotFound")] });
    }

    const newMentorship = await prisma.mentorship.create({
      data: {
        hourly_price,
        work_days: {
          connect: work_days.map((day: number) => ({
            id: day,
          })),
        },
        capacity: capacity,
        subject_id,
        category_id: existingSubject.category_id,
        tutor_id: Number(user_id),
        currency_id,
      },

      include: {
        work_days: true,
        currency: true,
        subject: true,
      },
    });

    return Responses._200({
      message: i18n.t("Mentorship.create.success"),
      data: newMentorship,
    });
  } catch (error) {
    console.log("Error creating mentorship", error);

    return Responses._500({
      errors: [i18n.t("internalServerError")],
      error: error,
    });
  }
};

export const create = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware([Roles.Tutor]),
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
      currency_id: number()
        .positive()
        .required(() => i18nString("currencyIdRequired")),
      hourly_price: number()
        .positive()
        .required(() => i18nString("hourlyPriceRequired")),
      capacity: number()
        .positive()
        .required(() => i18nString("capacityRequired")),
    }),
  }),
]);
