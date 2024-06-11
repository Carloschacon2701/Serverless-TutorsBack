import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { Responses } from "../../../libs/Responses";
import { schemaValidator } from "../../../libs/lambda";
import { number, object } from "yup";
import { initializePrisma } from "../../../utils/prisma";
import i18n from "../../../libs/i18n";

const i18nString = (key: string) => i18n.t("Document.find." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters } = event;
    const { subject_id = 0, limit = 10, page = 1 } = pathParameters || {};

    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(subject_id),
      },
    });

    if (!subject)
      return Responses._404({
        errors: [i18nString("validations.subjectNotFound")],
      });

    const list = await prisma.document.findMany({
      where: {
        subject_id: Number(subject_id),
      },
      select: {
        category_id: true,
        id: true,
        name: true,
        subject_id: true,
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const count = await prisma.document.count({
      where: {
        subject_id: Number(subject_id),
      },
    });

    return Responses._200({ data: list, count });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const list = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    pathParameters: object({
      subject_id: number().required("validations.idRequired"),
    }),
  }),
]);
