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

const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return Responses._200({ message: "Health Check", data: { status: "UP" } });
  } catch (error) {
    return Responses._500({ message: "Internal Server Error" });
  }
};

export const health = middy(handler);

health.use([
  jsonBodyParser(),
  schemaValidator({
    body: object({
      name: string().required(),
      email: string().email().required(),
      role: number().required(),
      description: string().required(),
    }),
  }),
]);
