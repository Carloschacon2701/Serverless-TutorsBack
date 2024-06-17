import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../../libs/Responses";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { i18nMiddleware } from "../../../middlewares/i18n";
import { schemaValidator } from "../../../libs/lambda";
import { date, number, object } from "yup";
import { ConsultacyCreation } from "../../../utils/Interfaces/Appointments";
import i18n from "../../../libs/i18n";
import { initializePrisma } from "../../../utils/prisma";
import { cognitoMiddleware } from "../../../middlewares/JWT";

const i18nString = (key: string, options?: object) =>
  i18n.t("Appointment.create." + key, { ...options });

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body as unknown as ConsultacyCreation;
    const prisma = initializePrisma();
    const { mentorship = 0, date = "", userCognito } = body;

    const existingMentorship = await prisma.mentorship.findUnique({
      where: {
        id: mentorship,
      },
      include: {
        work_days: true,
        _count: {
          select: {
            appointments: {
              where: {
                date: new Date(date),
                status: {
                  some: {
                    status_id: 1,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!existingMentorship) {
      return Responses._400({
        errors: [i18nString("validations.mentorshipNotFound")],
      });
    }

    if (existingMentorship._count.appointments >= existingMentorship.capacity) {
      return Responses._400({
        errors: [i18nString("validations.mentorshipFull")],
      });
    }

    const parsedDay = new Date(date).getDay();
    const isValidDate = existingMentorship.work_days.some(
      (d) => d.id === parsedDay
    );

    if (!isValidDate) {
      let workDays = "";

      existingMentorship.work_days.forEach((day) => {
        workDays += i18nString(`days.${day.name.toLowerCase()}`) + ", ";
      });

      return Responses._400({
        errors: [i18nString("validations.invalidDate", { workDays })],
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        tutor_id: existingMentorship.tutor_id,
        mentorship_id: mentorship,
        student_id: userCognito.id,
        status: {
          create: {
            status_id: 1,
          },
        },
      },

      include: {
        mentorship: true,
        student: true,
        tutor: true,
        status: true,
      },
    });

    return Responses._201({ data: appointment });
  } catch (error) {
    console.log(error);
    return Responses._500({ errors: [i18n.t("internalServerError")], error });
  }
};

export const create = middy(handler).use([
  jsonBodyParser(),
  i18nMiddleware(),
  cognitoMiddleware(),
  schemaValidator({
    body: object({
      mentorship: number().required(() =>
        i18nString("validations.mentorshipRequired")
      ),
      date: date()
        .min(new Date(), () => i18nString("validations.dateMustBeFuture"))
        .required(() => i18nString("validations.dateRequired")),
    }),
  }),
]);
