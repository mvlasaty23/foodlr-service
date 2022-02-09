import { CostType } from '@domain/cost.model';
import { DurationType } from '@domain/duration.model';
import { MealType, MealTypes } from '@domain/mealtype.model';
import { ConsumerHabbits } from '@domain/menuplan.model';
import schema from '@functions/menuplan/boundary/dto/create.dto.schema';
import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';

const dbClient = new AWS.DynamoDB.DocumentClient();
const menuPlanService = new MenuPlanService(new RecipeFacade(dbClient, process.env.FOODLR_TABLE));

export const createMenuPlan$: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  const { habbits, period } = event.body;
  return menuPlanService
    .generateMenuPlan$({
      habbits: new ConsumerHabbits(
        habbits.mealsPerDay,
        habbits.types.map((type) => MealType.of(type as MealTypes)),
        habbits.prepTimes as DurationType[],
        habbits.costs as CostType[],
      ),
      period: { start: new Date(period.start), end: new Date(period.end) },
    })
    .then<APIGatewayProxyResult>((menuPlan) =>
      formatJSONResponse({
        startDay: menuPlan.startDay.toISOString(),
        endDay: menuPlan.endDay.toISOString(),
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
      }),
    );
};

export const main = middyfy(createMenuPlan$);