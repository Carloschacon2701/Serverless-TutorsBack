import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { Responses } from "../../../libs/Responses";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { object, string } from "yup";
import { Cognito } from "../../../libs/AWS/Cognito";

const i18nString = (key: string) => i18n.t("User.logOut." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const token = event.headers.Authorization as string;
    const parsedToken = token.substring(7);

    await Cognito.SignOut(parsedToken);

    return Responses._200({
      message: i18nString("success"),
    });
  } catch (error: any) {
    console.log("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ errors: [i18n.t("internalServerError")], error }),
    };
  }
};

export const logOut = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    headers: object({
      Authorization: string().required(() =>
        i18nString("validations.tokenRequired")
      ),
    }),
  }),
]);
