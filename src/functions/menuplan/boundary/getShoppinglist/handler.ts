import { Day } from '@domain/menuplan.model';
import MenuPlanService from '@functions/menuplan/control/menuplan.service';
import { MenuplanRepository } from '@functions/menuplan/entity/menuplan.repository';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { table as recipeTable } from '@functions/recipe/boundary/common';
import { APIGatewayProxyValidatedHandler, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { menuplanTable } from '../common';
import bodySchema from '../dto/shoppinglist.dto.schema';
import headerSchema from '../dto/user.header.schema';

const dbClient = new AWS.DynamoDB.DocumentClient();
const menuPlanService = new MenuPlanService(
  new RecipeFacade(dbClient, recipeTable),
  new MenuplanRepository(dbClient, menuplanTable),
);

export const getShoppinglist$: APIGatewayProxyValidatedHandler<typeof bodySchema, typeof headerSchema> = async (
  event,
) => {
  const user = event.headers['x-user-id'];
  const startDay = event.body.startDay;
  return menuPlanService
    .getShoppinglist$({ user, startDay: Day.of(startDay) })
    .then<APIGatewayProxyResult>((shoppingList) =>
      formatJSONResponse({
        items: shoppingList.items.map((item) => ({
          name: item.name.value,
          amount: item.amount.value,
          uom: item.amount.uom as string,
        })),
      }),
    );
};

export const main = middyfy(getShoppinglist$);
