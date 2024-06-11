import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { number, object } from "yup";

const i18nString = (key: string) => i18n.t("Category.find." + key);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters } = event;
    const { id = 0 } = pathParameters || {};

    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        Subject: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return Responses._200({ data: category });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const find = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  schemaValidator({
    pathParameters: object({
      id: number().required(i18nString("validations.idRequired")),
    }),
  }),
]);
