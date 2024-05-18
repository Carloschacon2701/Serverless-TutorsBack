import { Schema } from "yup";

interface Request {
  event: {
    body?: any;
    queryStringParameters?: any;
    pathParameters?: any;
  };
}

export const schemaValidator = (schema: {
  body?: Schema;
  pathParameters?: Schema;
  queryStringParameters?: Schema;
}) => {
  const before = async (request: Request) => {
    try {
      const { body, queryStringParameters, pathParameters } = request.event;

      if (schema.body) {
        schema.body.validateSync(body);
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters ?? {});
      }

      if (schema.pathParameters) {
        schema.pathParameters.validateSync(pathParameters ?? {});
      }

      return Promise.resolve();
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: (e as any).errors,
        }),
      };
    }
  };

  return {
    before,
  };
};
