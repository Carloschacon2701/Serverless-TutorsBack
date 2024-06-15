import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import { S3 } from "../../../libs/AWS/S3";
import middy from "@middy/core";
import { i18nMiddleware } from "../../../middlewares/i18n";

const i18nString = (key: string) => i18n.t("Docs.find" + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { document_id = 0 } = event.pathParameters as { document_id: string };

    const document = await prisma.document.findUnique({
      where: {
        id: Number(document_id),
      },
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const { Body, ContentType } = await S3.get(document?.path || "");

    if (!Body) {
      return Responses._404({ errors: [i18nString("notFound")] });
    }

    const b64str = await Body?.transformToString("base64");

    return {
      headers: {
        "Content-Type": ContentType || "application/pdf",
        "Content-Disposition": "attachment; filename=" + document?.name,
        "Content-Encoding": "base64",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: b64str,
      isBase64Encoded: true,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const file = middy(handler).use([i18nMiddleware()]);
