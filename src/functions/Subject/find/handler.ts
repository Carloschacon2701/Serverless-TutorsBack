import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
import { schemaValidator } from "../../../libs/lambda";
import { number, object } from "yup";

const i18nString = (key: string) => i18n.t("Subject.find." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters } = event;
    const { id = 0 } = pathParameters || {};

    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Category: true,
      },
    });

    if (!subject)
      return Responses._404({ message: i18nString("validations.notFound") });

    return Responses._200({ data: subject });
  } catch (error) {
    return Responses._500({ message: i18n.t("internalServerError"), error });
  }
};

export const find = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    pathParameters: object({
      id: number().required(i18nString("validations.idRequired")),
    }),
  }),
]);
