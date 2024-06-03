export const Responses = {
  _DefineResponse(statusCode: number = 500, data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: statusCode,
      body: JSON.stringify(data),
    };
  },

  _200(data = {}) {
    return this._DefineResponse(200, data);
  },

  _201(data = {}) {
    return this._DefineResponse(201, data);
  },

  _400(data = {}) {
    return this._DefineResponse(400, data);
  },

  _401(data = {}) {
    return this._DefineResponse(401, data);
  },

  _404(data = {}) {
    return this._DefineResponse(404, data);
  },

  _500(data = {}) {
    return this._DefineResponse(500, data);
  },
};
