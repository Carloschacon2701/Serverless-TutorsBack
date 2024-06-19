import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { object, string } from "yup";
import { ChangePassword } from "../../../utils/Interfaces/User";
import { Cognito } from "../../../libs/AWS/Cognito";

const i18nString = (key: string) => i18n.t("User.changePassword." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body, headers } = event;
    const { currentPassword, newPassword } = body as unknown as ChangePassword;
    const { Authorization } = headers;
    const token = (Authorization as string).substring(7);

    await Cognito.changePassword({
      previousPassword: currentPassword,
      proposedPassword: newPassword,
      token,
    });

    return Responses._200({
      message: i18nString("success"),
    });
  } catch (error: any) {
    console.log("Error", error);

    if (error?.name === "NotAuthorizedException") {
      return Responses._400({
        errors: [i18nString("validations.invalidCredentials")],
      });
    }

    return Responses._500({ errors: [i18n.t("internalServerError")] });
  }
};

export const changePassword = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
  schemaValidator({
    body: object({
      currentPassword: string().required(() =>
        i18nString("validations.currentPasswordRequired")
      ),
      newPassword: string().required(() =>
        i18nString("validations.newPasswordRequired")
      ),
    }),
  }),
]);
