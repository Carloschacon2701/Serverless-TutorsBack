import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { DocumentCreation } from "../../../utils/Interfaces/Documents";
import { number, object, string } from "yup";
import { S3 } from "../../../libs/AWS/S3";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { randomUUID } from "crypto";

const i18nString = (key: string) => i18n.t("Docs.upload.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { body, headers } = event;
    const { name, subject } = body as unknown as DocumentCreation;
    const { user_id } = headers;

    const existingSubject = await prisma.subject.findUnique({
      where: { id: subject },
    });

    if (!existingSubject) {
      return Responses._404({ errors: [i18n.t("subjectNotFound")] });
    }

    const [fileName, format] = name.split(".");

    if (format !== "pdf") {
      return Responses._400({ errors: [i18nString("invalidFormat")] });
    }

    const uuid = randomUUID();
    const key = "documents/" + fileName + "-" + uuid + ".pdf";

    const presignedURL = await S3.getPresignedUrl(key);

    const doc = await prisma.document.create({
      data: {
        name: name,
        path: key,
        category_id: existingSubject?.category_id,
        subject_id: subject,
        created_by: Number(user_id),
      },
      select: {
        category_id: true,
        subject_id: true,
        name: true,
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Responses._200({ presignedURL, key, doc });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const upload = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
  schemaValidator({
    body: object({
      name: string().required(() => i18nString("nameRequired")),
      subject: number().required(() => i18nString("subjectRequired")),
    }),
  }),
]);
