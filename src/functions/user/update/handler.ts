import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { number, object, string } from "yup";
import { initializePrisma } from "../../../utils/prisma";
import i18n from "../../../libs/i18n";
import { UpdateUser } from "../../../utils/Interfaces/User";
import { cognitoMiddleware } from "../../../middlewares/JWT";

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { body } = event;
    const { description, role, userCognito } = body as unknown as UpdateUser;
    const updateObject: { role_id: number; description: string } = {} as {
      role_id: number;
      description: string;
    };

    if (role > 0 && role < 3) {
      updateObject["role_id"] = role;
    }

    if (description) {
      updateObject["description"] = description;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userCognito.id,
      },
      data: updateObject,
    });

    return Responses._200({ data: updatedUser });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const update = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
  schemaValidator({
    body: object({
      description: string().optional().default(""),
      role: number().optional().default(0),
    }),
  }),
]);
