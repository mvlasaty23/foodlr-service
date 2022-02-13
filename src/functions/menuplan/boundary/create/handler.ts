import { CostType } from '@domain/cost.model';
import { DurationType } from '@domain/duration.model';
import { MealType, MealTypes } from '@domain/mealtype.model';
import { ConsumerHabbits } from '@domain/menuplan.model';
import schema from '@functions/menuplan/boundary/dto/create.dto.schema';
import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { MenuplanRepository } from '@functions/menuplan/entity/menuplan.repository';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { table as recipeTable } from '@functions/recipe/boundary/common';
import { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { formatMenuplan, menuplanTable } from '../common';

const dbClient = new AWS.DynamoDB.DocumentClient();
const menuPlanService = new MenuPlanService(
  new RecipeFacade(dbClient, recipeTable),
  new MenuplanRepository(dbClient, menuplanTable),
);

export const createMenuPlan$: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  const { habbits, period } = event.body;
  const user = event.headers['x-user-id'];
  return menuPlanService
    .generateMenuPlan$({
      user,
      habbits: new ConsumerHabbits(
        habbits.mealsPerDay,
        habbits.types.map((type) => MealType.of(type as MealTypes)),
        habbits.prepTimes as DurationType[],
        habbits.costs as CostType[],
      ),
      period: { start: new Date(period.start), end: new Date(period.end) },
    })
    .then<APIGatewayProxyResult>(formatMenuplan);
};

export const main = middyfy(createMenuPlan$);
