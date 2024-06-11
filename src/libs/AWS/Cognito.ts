import {
  AdminConfirmSignUpCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const client = new CognitoIdentityProviderClient({
  region: process.env.REGION,
});

interface SignUp {
  email: string;
  password: string;
  role: string;
  name: string;
  id: string;
}

interface Update {
  email: string;
  role: string;
}

interface Login {
  email: string;
  password: string;
}

const CLIENT_ID = process.env.COGNITO_CLIENT_ID as string;
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID as string;

export const Cognito = {
  async signUp({ email, name, password, role, id }: SignUp) {
    const command = new SignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "custom:role",
          Value: role,
        },
        {
          Name: "custom:id",
          Value: id,
        },
        {
          Name: "name",
          Value: name,
        },
      ],
    });

    const response = await client.send(command);

    const confirmCommand = new AdminConfirmSignUpCommand({
      Username: email,
      UserPoolId: USER_POOL_ID,
    });

    await client.send(confirmCommand);

    return response;
  },

  async Login({ email, password }: Login) {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await client.send(command);

    return response;
  },

  async verifyToken(token: string) {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: USER_POOL_ID,
      tokenUse: "id",
      clientId: CLIENT_ID,
    });

    try {
      const payload = await verifier.verify(token);
      return payload;
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  },

  async SignOut(token: string) {
    const command = new GlobalSignOutCommand({
      AccessToken: token,
    });

    const response = await client.send(command);

    return response;
  },

  async updateAttributes({ email, role }: Update) {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: "custom:role",
          Value: role,
        },
      ],
    });

    const response = await client.send(command);

    return response;
  },
};
