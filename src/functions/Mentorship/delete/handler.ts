import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { object, string } from "yup";
import i18n from "../../../libs/i18n";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { AppointmentStatus, Roles } from "../../../utils/enums";

const i18nString = (key: string) => i18n.t("Mentorship.delete." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { mentorship_id } = event.pathParameters ?? {};
    const { user_id = "" } = event.headers;

    const mentorship = await prisma.mentorship.findUnique({
      where: {
        id: Number(mentorship_id),
        tutor_id: Number(user_id),
      },
      include: {
        appointments: {
          where: {
            status: {
              some: {
                status_id: AppointmentStatus.Placed,
              },
            },
          },
        },
      },
    });

    if (!mentorship) {
      return Responses._404({
        errors: [i18nString("validations.mentorshipNotFound")],
      });
    }

    await prisma.mentorship.update({
      where: {
        id: Number(mentorship_id),
        tutor_id: Number(user_id),
      },
      data: {
        active: false,
      },
    });

    for (const appointment of mentorship.appointments) {
      await prisma.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          status: {
            create: {
              status_id: AppointmentStatus.Cancelled,
            },
          },
        },
      });
    }

    return Responses._200({ message: [i18nString("success")] });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const deleteMentorship = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware([Roles.Tutor]),
  schemaValidator({
    pathParameters: object({
      mentorship_id: string().required(
        i18nString("validations.mentorshipIdRequired")
      ),
    }),
  }),
]);
