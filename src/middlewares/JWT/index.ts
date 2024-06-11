import { Cognito } from "../../libs/AWS/Cognito";
import { Responses } from "../../libs/Responses";
import i18n from "../../libs/i18n";
import { initializePrisma } from "../../utils/prisma";

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
      const prisma = initializePrisma();
      const { body = {}, headers } = handler.event;
      const token = headers["Authorization"] || "";
      const parsedToken = token.substring(7);

      const result = await Cognito.verifyToken(parsedToken);

      if (!result) {
        return Responses._401({ errors: [i18n.t("unauthorized")] });
      }

      const user = await prisma.user.findUnique({
        where: { email: (result?.email as string) || "" },
      });

      if (!user) {
        return Responses._404({ errors: [i18n.t("userNotFound")] });
      }

      if (validRoles && !validRoles.includes(user.role_id)) {
        return Responses._403({ errors: [i18n.t("forbidden")] });
      }

      console.log(body);
      if (body) {
        body.userCognito = user;
      } else {
        headers["user_id"] = user.id.toString();
      }
    },
  };
};
