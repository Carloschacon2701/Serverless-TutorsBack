import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
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
    const { config = 0, date = "" } = body;

    const student = 0;

    const existingConfig = await prisma.config.findUnique({
      where: {
        id: config,
      },
    });

    if (!existingConfig) {
      return Responses._400({
        message: i18nString("configNotFound"),
      });
    }

    const consultancy = await prisma.consultancies.create({
      data: {
        date: new Date(date),
        tutor_id: existingConfig.tutor_id,
        config_id: config,
        student_id: student,
      },
    });

    return Responses._201(consultancy);
  } catch (error) {
    console.log(error);
    return Responses._500({ message: "Internal Server Error", error });
  }
};

export const create = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      config: number().required(),
      date: date().required(),
    }),
  }),
]);
