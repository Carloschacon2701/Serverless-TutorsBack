import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { object, string } from "yup";
import { schemaValidator } from "../../../libs/lambda";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { UploadUserPhoto } from "../../../utils/Interfaces/User";
import { S3 } from "../../../libs/AWS/S3";
import { randomUUID } from "crypto";
import { initializePrisma } from "../../../utils/prisma";

const i18nString = (key: string) =>
  i18n.t("User.uploadPhoto.validations" + key);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { body } = event;
    const { key, userCognito } = body as unknown as UploadUserPhoto;
    const validFormats = ["jpg", "jpeg", "png"];

    const [filename, format] = key.split(".");

    if (!validFormats.includes(format)) {
      return Responses._400({
        errors: [i18nString("photoFormatInvalid")],
      });
    }

    const uuid = randomUUID();

    const path = "profile/" + filename + "-" + uuid + "." + format;

    const presignedURL = await S3.getPresignedUrl(path);

    await prisma.user.update({
      where: {
        id: userCognito.id,
      },
      data: {
        photo: path,
      },
    });

    return Responses._200({ data: presignedURL });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const uploadProfilePhoto = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
  schemaValidator({
    body: object({
      key: string().required(() => i18nString("photoRequired")),
    }),
  }),
]);
