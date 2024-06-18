import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { object, string } from "yup";
import { UserLogIn } from "../../../utils/Interfaces/User";
import { Cognito } from "../../../libs/AWS/Cognito";
import { Responses } from "../../../libs/Responses";

const i18nString = (key: string) => i18n.t("User.logIn.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const body = event.body as unknown as UserLogIn;
    const { email, password } = body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Responses._400({
        errors: [i18nString("invalidCredentials")],
      });
    }

    const { AuthenticationResult } = await Cognito.Login({ email, password });
    const { RefreshToken, AccessToken } = AuthenticationResult || {};

    return Responses._200({
      message: i18n.t("User.logIn.success"),
      RefreshToken,
      AccessToken,
      user_id: user.id,
    });
  } catch (error: any) {
    console.log("Error", error);
    if (error?.name === "UserNotConfirmedException") {
      return Responses._400({
        errors: [i18nString("userNotConfirmed")],
      });
    }

    if (error?.name === "NotAuthorizedException") {
      return Responses._400({
        errors: [i18nString("invalidCredentials")],
      });
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ errors: [i18n.t("internalServerError")], error }),
    };
  }
};

export const logIn = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      email: string().required(() => i18nString("emailRequired")),
      password: string().required(() => i18nString("passwordRequired")),
    }),
  }),
]);
