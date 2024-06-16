import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initializePrisma } from "../../../utils/prisma";
import { Responses } from "../../../libs/Responses";
import i18n from "../../../libs/i18n";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const i18nString = (key: string) => i18n.t("Appointment.find." + key);

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const prisma = initializePrisma();
    const { headers, queryStringParameters } = event;
    const { user_id } = headers || {};
    const { appointmentId } = queryStringParameters || {};

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(appointmentId),
        OR: [
          {
            student_id: Number(user_id),
          },
          {
            tutor_id: Number(user_id),
          },
        ],
      },
      select: {
        created_at: true,
        date: true,
        id: true,
        mentorship: {
          select: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        tutor: {
          select: {
            id: true,
            name: true,
          },
        },
        status: {
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
    });

    if (!appointment) {
      return Responses._404({ errors: [i18nString("validations.notFound")] });
    }

    return Responses._200({ data: appointment });
  } catch (error) {
    console.error(error);
    return Responses._500({ errors: [i18n.t("internalServerError")] });
  }
};

export const find = middy(handler).use([jsonBodyParser()]);
