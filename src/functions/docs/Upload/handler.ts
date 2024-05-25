import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
import { schemaValidator } from "../../../libs/lambda";
import { DocumentCreation } from "../../../utils/Interfaces/Documents";
import { number, object, string } from "yup";
import { S3 } from "../../../libs/AWS/S3";

const i18nString = (key: string) => i18n.t("Docs.upload.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const body = event.body as unknown as DocumentCreation;
    const { category, name, subject } = body;

    const key = "documents/" + name;

    const presignedURL = await S3.getPresignedUrl(key);

    const doc = await prisma.document.create({
      data: {
        name: name,
        path: key,
        category_id: category,
        subject_id: subject,
      },
    });

    return Responses._200({ presignedURL, key, doc });

    return Responses._200({ message: "Hello World" });
  } catch (error) {
    console.log(error);
    return Responses._500({ message: i18n.t("internalServerError"), error });
  }
};

export const upload = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      name: string().required(() => i18nString("nameRequired")),
      category: number().required(() => i18nString("categoryRequired")),
      subject: number().required(() => i18nString("subjectRequired")),
    }),
  }),
]);