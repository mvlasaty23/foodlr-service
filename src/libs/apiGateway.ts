import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

// Event
export type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<T>;
};
export type APIGatewayProxyEventWithHeaders<T> = Omit<APIGatewayProxyEvent, 'headers'> & { headers: FromSchema<T> };
export type ValidatedAPIGatewayProxyEventAndHeader<T, TH> = Omit<ValidatedAPIGatewayProxyEvent<T>, 'headers'> & {
  headers: FromSchema<TH>;
};

// Event Handler
export type APIGatewayProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;
export type APIGatewayProxyBodyHandler<T> = Handler<ValidatedAPIGatewayProxyEvent<T>, APIGatewayProxyResult>;
export type APIGatewayProxyHeaderHandler<T = Record<string, string>> = Handler<
  APIGatewayProxyEventWithHeaders<T>,
  APIGatewayProxyResult
>;
export type APIGatewayProxyValidatedHandler<T, TH> = Handler<
  ValidatedAPIGatewayProxyEventAndHeader<T, TH>,
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
