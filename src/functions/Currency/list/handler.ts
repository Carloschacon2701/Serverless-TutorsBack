import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";

const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();

    const currencies = await prisma.currency.findMany({
      select: {
        id: true,
        name: true,
        symbol: true,
      },
    });

    return Responses._200({ data: currencies });
  } catch (error) {
    console.error(error);
    return Responses._500({ message: "internalServerError", error });
  }
};

export const list = handler;
