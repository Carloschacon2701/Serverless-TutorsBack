import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { Responses } from "../../libs/Responses";

export const health: Handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return Responses._200({ message: "Health Check", data: { status: "UP" } });
};
