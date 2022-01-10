import middy, { MiddyfiedHandler } from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { Context, Handler } from 'aws-lambda';

export const middyfy = (handler: Handler<unknown, unknown>): MiddyfiedHandler<unknown, unknown, Error, Context> => {
  return middy(handler).use(middyJsonBodyParser());
};
