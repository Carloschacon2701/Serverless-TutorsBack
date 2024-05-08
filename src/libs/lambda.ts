import { Schema } from "yup";

interface Request {
  event: {
    body?: any;
    queryStringParameters?: any;
  };
}

export const schemaValidator = (schema: {
  body?: Schema;
  queryStringParameters?: Schema;
}) => {
  const before = async (request: Request) => {
    try {
      const { body, queryStringParameters } = request.event;

      if (schema.body) {
        schema.body.validateSync(body);
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters ?? {});
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
