import { Day } from '@domain/menuplan.model';
import schema from '@functions/menuplan/boundary/dto/delete.dto.schema';
import headerSchema from '@functions/menuplan/boundary/dto/user.header.schema';
import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { MenuplanRepository } from '@functions/menuplan/entity/menuplan.repository';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { table as recipeTable } from '@functions/recipe/boundary/common';
import { APIGatewayProxyValidatedHandler, responseOK } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { menuplanTable } from '../common';

const dbClient = new AWS.DynamoDB.DocumentClient();
const menuPlanService = new MenuPlanService(
  new RecipeFacade(dbClient, recipeTable),
  new MenuplanRepository(dbClient, menuplanTable),
);

export const deleteMenuplan$: APIGatewayProxyValidatedHandler<typeof schema, typeof headerSchema> = async (event) => {
  const { day } = event.body;
  const user = event.headers['x-user-id'];
  return menuPlanService
    .deleteMenuplan$({
      user,
      day: Day.of(day),
    })
    .then<APIGatewayProxyResult>(() => responseOK());
};

export const main = middyfy(deleteMenuplan$);
