import { Cognito } from "../../libs/AWS/Cognito";
import { Responses } from "../../libs/Responses";
import i18n from "../../libs/i18n";

interface Handler {
  event: {
    headers: {
      Authorization: string;
      user_id: string;
    };
    body: any;
  };
}

export const cognitoMiddleware = (validRoles?: number[]) => {
  return {
    before: async (handler: Handler) => {
      const { headers } = handler.event;
      const token = headers["Authorization"] || "";
      const parsedToken = token.substring(7);

      const user_attributes = await Cognito.verifyToken(parsedToken);

      if (!user_attributes) {
        return Responses._401({ errors: [i18n.t("unauthorized")] });
      }

      if (validRoles && !validRoles.includes(user_attributes?.role)) {
        return Responses._403({ errors: [i18n.t("forbidden")] });
      }

      headers["user_id"] = String(user_attributes.id);
    },
  };
};
