import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";
import { Cognito } from "../../libs/AWS/Cognito";
import { Responses } from "../../libs/Responses";
import i18n from "../../libs/i18n";
import { initializePrisma } from "../../utils/prisma";

interface Handler {
  event: {
    headers: {
      Authorization: string;
      user: CognitoIdTokenPayload;
    };
    body: any;
  };
}

export const cognitoMiddleware = (validRoles?: number[]) => {
  return {
    before: async (handler: Handler) => {
      const prisma = initializePrisma();
      const token = handler.event.headers["Authorization"] || "";
      const parsedToken = token.substring(7);

      const result = await Cognito.verifyToken(parsedToken);
      const role = (result?.["custom:role"] as number) || 0;

      if (!result) {
        return Responses._401({ message: i18n.t("unauthorized") });
      }

      const user = await prisma.user.findUnique({
        where: { email: (result?.email as string) || "" },
      });

      if (!user) {
        return Responses._404({ message: i18n.t("userNotFound") });
      }

      if (validRoles && !validRoles.includes(role)) {
        return Responses._403({ message: i18n.t("forbidden") });
      }

      handler.event.body.userCognito = user;
    },
  };
};
