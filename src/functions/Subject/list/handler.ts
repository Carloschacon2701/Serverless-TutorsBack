import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import i18n from "../../../libs/i18n";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../libs/i18n/middleware";

// const i18nString = (key: string) => i18n.t("Subject.find." + key);

const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();

    const subjects = await prisma.subject.findMany({
      select: {
        name: true,
        id: true,
        Category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const count = await prisma.subject.count();

    return Responses._200({ data: { ...subjects }, count });
  } catch (error) {
    console.log("Error", error);
    return Responses._500({ message: i18n.t("internalServerError"), error });
  }
};

export const list = middy(handler).use([jsonBodyParser(), i18nMiddleware()]);
