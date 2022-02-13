import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { MenuplanRepository } from '@functions/menuplan/entity/menuplan.repository';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { table as recipeTable } from '@functions/recipe/boundary/common';
import { APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { formatMenuplans, menuplanTable } from '../common';
import headerSchema from '../dto/user.header.schema';

const dbClient = new AWS.DynamoDB.DocumentClient();
const menuPlanService = new MenuPlanService(
  new RecipeFacade(dbClient, recipeTable),
  new MenuplanRepository(dbClient, menuplanTable),
);

export const findMenuplans$: APIGatewayProxyHandler<typeof headerSchema> = async (event) => {
  const user = event.headers['x-user-id'];
  return menuPlanService.findMenuplans$(user).then<APIGatewayProxyResult>(formatMenuplans);
};

export const main = middyfy(findMenuplans$);
