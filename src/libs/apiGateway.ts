import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<T> };
export type ValidatedEventAPIGatewayProxyHandler<T> = Handler<ValidatedAPIGatewayProxyEvent<T>, APIGatewayProxyResult>;
export type APIGatewayProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

export const formatJSONResponse = (response: Record<string, unknown>): APIGatewayProxyResult => ({
  statusCode: 200,
  body: JSON.stringify(response),
});

export const responseOK = (): APIGatewayProxyResult => ({
  statusCode: 200,
  body: null,
});
