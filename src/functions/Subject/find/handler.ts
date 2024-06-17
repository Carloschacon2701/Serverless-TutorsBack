import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";

const i18nString = (key: string) => i18n.t("Subject.find." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters } = event;
    const { subject_id = 0 } = pathParameters || {};

    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(subject_id),
      },
      include: {
        Category: true,
      },
    });

    if (!subject)
      return Responses._404({ errors: [i18nString("validations.notFound")] });

    return Responses._200({ data: subject });
  } catch (error) {
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const find = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
