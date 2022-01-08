import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import 'source-map-support/register';
import schema from './dto/recipe.schema';

// const dbClient = new AWS.DynamoDB.DocumentClient();
// TODO: set region by env?

// eslint-disable-next-line @typescript-eslint/require-await
const findOne: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return null;
};

// eslint-disable-next-line @typescript-eslint/require-await
const findAll: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return null;
};

// eslint-disable-next-line @typescript-eslint/require-await
const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return null;
};

// eslint-disable-next-line @typescript-eslint/require-await
const update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return null;
};

// eslint-disable-next-line @typescript-eslint/require-await
const remove: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return null;
};

export const findOneHandler = middyfy(findOne);
export const findAllHandler = middyfy(findAll);
export const createHandler = middyfy(create);
export const updateHandler = middyfy(update);
export const removeHandler = middyfy(remove);
