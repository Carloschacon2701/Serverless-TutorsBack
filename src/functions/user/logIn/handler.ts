import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
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
      return {
        statusCode: 400,
        body: JSON.stringify({ message: i18nString("invalidCredentials") }),
      };
    }

    const result = await Cognito.Login({ email, password });

    console.log(result);

    return Responses._200({ message: i18n.t("User.logIn.sucess"), result });
  } catch (error: any) {
    if (error?.name === "UserNotConfirmedException") {
      return Responses._400({
        message: i18n.t("User.logIn.validations.userNotConfirmed"),
      });
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: i18n.t("internalServerError"), error }),
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
