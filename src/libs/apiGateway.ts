import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

export type ValidatedAPIGatewayProxyEvent<T, TH> = Omit<APIGatewayProxyEvent, 'body' | 'headers'> & {
  body: FromSchema<T>;
} & { headers: FromSchema<TH> };
export type ValidatedEventAPIGatewayProxyHandler<T, TH = Record<string, string>> = Handler<
  ValidatedAPIGatewayProxyEvent<T, TH>,
  APIGatewayProxyResult
>;
type APIGatewayProxyEventWithHeaders<T> = Omit<APIGatewayProxyEvent, 'headers'> & { headers: FromSchema<T> };
export type APIGatewayProxyHandler<T = Record<string, string>> = Handler<
  APIGatewayProxyEventWithHeaders<T>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown> | Record<string, unknown>[],
): APIGatewayProxyResult => ({
  statusCode: 200,
  body: JSON.stringify(response),
});

export const responseOK = (): APIGatewayProxyResult => ({
  statusCode: 200,
  body: null,
});
