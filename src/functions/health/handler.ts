import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../libs/Responses";
import i18n from "../../libs/i18n";
import middy from "@middy/core";
import { i18nMiddleware } from "../../middlewares/i18n";

const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return Responses._200({ message: i18n.t("hello"), data: { status: "UP" } });
};

export const health = middy(handler).use([i18nMiddleware()]);
