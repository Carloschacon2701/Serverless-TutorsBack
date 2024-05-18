import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

interface SignUp {
  email: string;
  password: string;
  role: string;
  name: string;
}

interface Login {
  email: string;
  password: string;
}

export const Cognito = {
  async signUp({ email, name, password, role }: SignUp) {
    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
        {
          Name: "custom:role",
          Value: role,
        },
        {
          Name: "name",
          Value: name,
        },
      ],
    });

    const response = await client.send(command);

    return response;
  },

  async Login({ email, password }: Login) {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await client.send(command);

    return response;
  },
};