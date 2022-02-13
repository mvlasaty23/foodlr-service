import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { MenuplanRepository } from '@functions/menuplan/entity/menuplan.repository';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { table as recipeTable } from '@functions/recipe/boundary/common';
import { APIGatewayProxyHandler, formatJSONResponse } from '@libs/apiGateway';
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

export const findMenuplans$: APIGatewayProxyHandler = async (event) => {
  const user = event.headers['x-user-id'];
  return menuPlanService.findMenuplans$(user).then<APIGatewayProxyResult>((menuPlans) =>
    formatJSONResponse(
      menuPlans.map((menuPlan) => ({
        startDay: menuPlan.start.toISOString(),
        endDay: menuPlan.end.toISOString(),
        recipes: menuPlan.recipes.map((recipe) => ({
          name: recipe.name.value,
          servings: recipe.servings.value,
          ingredients: recipe.ingredients.map((it) => ({
            name: it.name.value,
            quantity: it.quantity.value,
            uom: it.uom.value,
          })),
          preparationTime: recipe.preparationTime.value,
          season: recipe.season.value,
          costs: recipe.costs.value,
          region: recipe.region.value,
        })),
      })),
    ),
  );
};

export const main = middyfy(findMenuplans$);
