import { MealTypes } from '@domain/mealtype.model';
import { Day, MenuPlan } from '@domain/menuplan.model';
import { Recipe } from '@domain/recipe.model';
import { RegionKeys } from '@domain/region.model';
import { SeasonKeys } from '@domain/season.model';
import headerSchema from '@functions/menuplan/boundary/dto/user.header.schema';
import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { MenuplanRepository } from '@functions/menuplan/entity/menuplan.repository';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { table as recipeTable } from '@functions/recipe/boundary/common';
import { APIGatewayProxyValidatedHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { formatMenuplan, menuplanTable } from '../common';
import schema from '../dto/update.dto.schema';

const dbClient = new AWS.DynamoDB.DocumentClient();
const menuPlanService = new MenuPlanService(
  new RecipeFacade(dbClient, recipeTable),
  new MenuplanRepository(dbClient, menuplanTable),
);

export const updateMenuplan$: APIGatewayProxyValidatedHandler<typeof schema, typeof headerSchema> = async (event) => {
  const user = event.headers['x-user-id'];
  const { recipes, startDay, endDay } = event.body;
  return menuPlanService
    .updateMenuplan$({
      menuplan: new MenuPlan(
        user,
        recipes.map((recipe) =>
          Recipe.of({
            name: recipe.name,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            prepTime: recipe.preparationTime,
            season: recipe.season as SeasonKeys,
            costs: recipe.costs,
            region: recipe.region as RegionKeys,
            type: recipe.type as MealTypes,
          }),
        ),
        Day.of(startDay),
        Day.of(endDay),
      ),
    })
    .then<APIGatewayProxyResult>(formatMenuplan);
};

export const main = middyfy(updateMenuplan$);
