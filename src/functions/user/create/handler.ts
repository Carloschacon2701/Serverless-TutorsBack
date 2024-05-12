import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { number, object, string } from "yup";
import { Responses } from "../../../libs/Responses";
import { schemaValidator } from "../../../libs/lambda";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
import i18n from "../../../libs/i18n";
import { PrismaClient } from "@prisma/client";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = new PrismaClient();
    const { name, email, role, description } = JSON.parse(event.body as string);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error(i18n.t("validations.emailExists"));
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        description,
      },
    });

    return Responses._200({
      message: i18n.t("User.newUser.success"),
      user: newUser,
    });
  } catch (error) {
    return Responses._500({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const health = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      name: string().required(i18n.t("validations.nameRequired")),
      email: string().email().required(i18n.t("validations.emailRequired")),
      role: number()
        .required(i18n.t("validations.roleRequired"))
        .oneOf([1, 2, 3], i18n.t("validations.roleInvalid")),
      description: string().required(i18n.t("validations.descriptionRequired")),
    }),
  }),
]);
