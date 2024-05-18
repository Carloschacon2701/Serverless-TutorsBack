import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { object, string } from "yup";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
import { schemaValidator } from "../../../libs/lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";

const i18nString = (key: string) => i18n.t("Config.list.validations" + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();

    const { id } = event.pathParameters ?? {};

    const config = await prisma.config.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!config) {
      return Responses._404({
        message: i18nString("configNotFound"),
      });
    }

    return Responses._200(config);
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
