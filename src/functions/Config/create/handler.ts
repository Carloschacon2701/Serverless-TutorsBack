import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
import { schemaValidator } from "../../../libs/lambda";
import { array, mixed, number, object } from "yup";
import { initializePrisma } from "../../../utils/prisma";
import { Roles } from "../../../utils/enums";

const i18nString = (key: string, options?: object) =>
  i18n.t("Config.create.validations." + key, { ...options });

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();

    const {
      work_days,
      subject_id,
      category_id,
      tutor_id,
      currency_id,
      hourly_price,
    } = JSON.parse(event.body as string);

    const existingCategory = await prisma.category.findUnique({
      where: {
        id: category_id,
      },
    });

    if (!existingCategory) {
      throw new Error(i18nString("categoryNotFound"));
    }

    const existingSubject = await prisma.subject.findUnique({
      where: {
        id: subject_id,
        category_id: existingCategory?.id,
      },
    });

    if (!existingSubject) {
      throw new Error(i18nString("subjectNotFound"));
    }

    const existingTutor = await prisma.user.findUnique({
      where: {
        id: tutor_id,
        role_id: Roles.Tutor,
      },
    });

    if (!existingTutor) {
      throw new Error(i18nString("tutorNotFound"));
    }

    const existingConfig = await prisma.config.findFirst({
      where: {
        tutor_id: tutor_id,
        subject_id: subject_id,
      },
    });

    if (existingConfig) {
      throw new Error(
        i18nString("configAlreadyExists", {
          subject_name: existingSubject.name,
        })
      );
    }

    const existingCurrency = await prisma.currency.findUnique({
      where: {
        id: currency_id,
      },
    });

    if (!existingCurrency) {
      throw new Error(i18nString("currencyNotFound"));
    }

    const newConfig = await prisma.config.create({
      data: {
        hourly_price,
        work_days,
        subject_id,
        category_id,
        tutor_id,
        currency_id,
      },
    });

    return Responses._200(newConfig);
  } catch (error) {
    console.log("Error creating config", error);

    return Responses._500({
      message: i18nString("internalServerError"),
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
        mixed().oneOf([1, 2, 3, 4, 5]).required(i18nString("workDaysRequired"))
      ),
      subject_id: number().positive().required(i18nString("subjectIdRequired")),
      category_id: number()
        .positive()
        .required(i18nString("categoryIdRequired")),
      tutor_id: number().positive().required(i18nString("tutorIdRequired")),
      currency_id: number()
        .positive()
        .required(i18nString("currencyIdRequired")),
      hourly_price: number()
        .positive()
        .required(i18nString("hourlyPriceRequired")),
    }),
  }),
]);