import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { number, object, string } from "yup";
import { Responses } from "../../../libs/Responses";
import { schemaValidator } from "../../../libs/lambda";
import { i18nMiddleware } from "../../../libs/i18n/middleware";
import i18n from "../../../libs/i18n";
import { PrismaClient } from "@prisma/client";
import { Cognito } from "../../../libs/AWS/Cognito";

const i18nString = (key: string) => i18n.t("User.newUser.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = new PrismaClient();
    const { name, email, role, description, password } = JSON.parse(
      event.body as string
    );

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const existingRole = await prisma.role.findUnique({
      where: {
        id: role,
      },
    });

    if (!existingRole) {
      throw new Error(i18nString("roleInvalid"));
    }

    if (existingUser) {
      throw new Error(i18nString("emailExists"));
    }

    await Cognito.signUp({
      email,
      name,
      password,
      role: role.toString(),
    });

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
      message: i18n.t("internalServerError"),
      error: error,
    });
  }
};

export const health = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      name: string().required(i18nString("nameRequired")),
      email: string().email().required(i18nString("emailRequired")),
      password: string().required(i18nString("passwordRequired")),
      role: number()
        .required(i18nString("roleRequired"))
        .oneOf([1, 2, 3], i18nString("roleInvalid")),
      description: string().required(i18nString("descriptionRequired")),
    }),
  }),
]);
