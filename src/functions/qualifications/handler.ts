import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responses } from "../../libs/Responses";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

interface Test {
  percentage: number;
  qualification: number;
}

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { body } = event;
  const { tests, totalTests } = body as unknown as {
    totalTests: number;
    tests: Test[];
  };
  const neccesaryQualifications = [5, 6, 7, 8, 9];
  let acc = 0;
  const results = {} as Record<number, number | string>;
  let remainingPercentage = 100;

  if (tests.length >= totalTests)
    return Responses._400({
      message: "The number of tests is greater than the total number of tests",
    });

  for (const { percentage, qualification } of tests) {
    const convertedQualification =
      parseFloat(((qualification / 100) * 9)?.toFixed(1)) + 0.4;

    acc += convertedQualification * (percentage / 100);
    remainingPercentage -= percentage;
  }

  for (const qualification of neccesaryQualifications) {
    const necessaryPoints = Number((qualification - acc).toFixed(1)) - 0.5;
    const maximumPoints = 9 * (remainingPercentage / 100);

    if (necessaryPoints < 1) {
      results[qualification] = 0;
      continue;
    }

    const desiredQualification = (necessaryPoints * 100) / maximumPoints - 3;

    if (desiredQualification > 100) {
      results[qualification] = "impossible";
      continue;
    }

    results[qualification] = Math.floor(desiredQualification);
  }

  return Responses._200({ data: results });
};

export const getQualification = middy(handler).use([jsonBodyParser()]);
