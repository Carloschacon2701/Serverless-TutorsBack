import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { S3 } from "../../../libs/AWS/S3";

const i18nString = (key: string) => i18n.t("Docs.delete." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { headers, pathParameters } = event;
    const { document_id = 0 } = pathParameters as { document_id: string };
    const { user_id = 0 } = headers;

    const document = await prisma.document.findUnique({
      where: {
        id: Number(document_id),
      },
    });

    if (!document) {
      return Responses._404({ errors: [i18nString("validations.notFound")] });
    }

    if (document.created_by !== Number(user_id)) {
      return Responses._403({ errors: [i18nString("validations.notOwner")] });
    }

    await Promise.all([
      prisma.document.delete({
        where: {
          id: Number(document_id),
        },
      }),
      S3.delete(document.path),
    ]);

    return Responses._200({ message: i18nString("success") });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const deleteDoc = middy(handler).use([
  i18nMiddleware(),
  cognitoMiddleware(),
]);
