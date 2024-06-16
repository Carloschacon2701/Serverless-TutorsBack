import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { cognitoMiddleware } from "../../../middlewares/JWT";
import { AppointmentStatus } from "../../../utils/enums";

const i18nString = (key: string) => i18n.t("Appointment.delete." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { pathParameters, headers } = event;
    const { appointment_id = 0 } = pathParameters || {};
    const { user_id } = headers || {};

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(appointment_id),
      },
      select: {
        student_id: true,
        status: {
          take: 1,
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    if (!appointment) {
      return Responses._400({
        errors: [i18nString("validations.appointmentNotFound")],
      });
    }

    if (appointment.student_id !== Number(user_id)) {
      return Responses._400({
        errors: [i18nString("validations.notOwner")],
      });
    }

    if (appointment.status[0].status_id !== AppointmentStatus.Placed) {
      return Responses._400({
        errors: [i18nString("validations.appointmentCancelled")],
      });
    }

    await prisma.appointment.update({
      where: {
        id: Number(appointment_id),
      },
      data: {
        status: {
          create: {
            status_id: AppointmentStatus.Cancelled,
          },
        },
      },
    });

    return Responses._200({ message: i18nString("success") });
  } catch (error) {
    return Responses._500({ errors: [i18n.t("internalServerError")] });
  }
};

export const deleteAppointment = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
]);
