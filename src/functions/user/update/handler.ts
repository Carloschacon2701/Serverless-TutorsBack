import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import middy from "@middy/core";

const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return Responses._200({ message: "Health Check", data: { status: "UP" } });
  } catch (error) {
    return Responses._500({ message: "Internal Server Error" });
  }
};

export const update = middy(handler);
