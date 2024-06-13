import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { number, object, string } from "yup";
import { Responses } from "../../../libs/Responses";
import { schemaValidator } from "../../../libs/lambda";
import { i18nMiddleware } from "../../../middlewares/i18n";
import i18n from "../../../libs/i18n";
import { Cognito } from "../../../libs/AWS/Cognito";
import { UserCreation } from "../../../utils/Interfaces/User";
import { initializePrisma } from "../../../utils/prisma";
import {
  mayusRules,
  numberRules,
  specialRules,
  lengthRules,
} from "../../../utils/regExp";

const i18nString = (key: string) => i18n.t("User.newUser.validations." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const body = event.body as unknown as UserCreation;
    const { name, email, role, description, password, career } = body;

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

    const existingCareer = await prisma.career.findUnique({
      where: {
        id: career,
      },
    });

    if (!existingRole) {
      return Responses._400({
        errors: [i18nString("roleInvalid")],
      });
    }

    if (existingUser) {
      return Responses._400({
        errors: [i18nString("emailExists")],
      });
    }

    if (!existingCareer) {
      return Responses._400({
        errors: [i18nString("careerInvalid")],
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role_id: role,
        description,
        career_id: career,
      },
      include: {
        career: true,
        role: true,
      },
    });

    await Cognito.signUp({
      email,
      name,
      password,
      role: role.toString(),
      id: newUser.id.toString(),
    });

    return Responses._200({
      errors: [i18n.t("User.newUser.success")],
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return Responses._500({
      errors: [i18n.t("internalServerError")],
      error: error,
    });
  }
};

export const create = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    body: object({
      name: string().required(() => i18nString("nameRequired")),
      email: string()
        .email()
        .required(() => i18nString("emailRequired")),
      password: string()
        .required(() => i18nString("passwordRequired"))
        .matches(mayusRules, () => i18nString("passwordMayus"))
        .matches(numberRules, () => i18nString("passwordNumber"))
        .matches(specialRules, () => i18nString("passwordSpecial"))
        .matches(lengthRules, () => i18nString("passwordLength")),
      role: number()
        .required(() => i18nString("roleRequired"))
        .oneOf([1, 2], () => i18nString("roleInvalid")),
      description: string().default(""),
      career: number().required(() => i18nString("careerRequired")),
    }),
  }),
]);
