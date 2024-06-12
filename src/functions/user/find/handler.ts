import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { number, object } from "yup";
import i18n from "../../../libs/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";

const i18nString = (key: string) => i18n.t("User.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { user_id } = event.pathParameters as { user_id: string };

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(user_id),
      },
      include: {
        career: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error(i18nString("userNotFound"));
    }

    return Responses._200({ data: user });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const find = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    pathParameters: object({
      id: number().required(i18nString("idRequired")),
    }),
  }),
]);
