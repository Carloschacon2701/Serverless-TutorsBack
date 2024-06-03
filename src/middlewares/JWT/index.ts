import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";
import { Cognito } from "../../libs/AWS/Cognito";
import { Responses } from "../../libs/Responses";
import i18n from "../../libs/i18n";

interface Handler {
  event: {
    headers: {
      Authorization: string;
      user: CognitoIdTokenPayload;
    };
  };
}

export const cognitoMiddleware = () => {
  return {
    before: async (handler: Handler) => {
      const token = handler.event.headers["Authorization"] || "";

      const parsedToken = token.substring(7);

      const result = await Cognito.verifyToken(parsedToken);

      if (!result) {
        return Responses._401({ message: i18n.t("unauthorized") });
      }

      handler.event.headers["user"] = result;

      return null;
    },
  };
};
