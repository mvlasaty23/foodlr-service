import { RecipeId } from '@domain/recipe.model';
import RecipeService from '@functions/recipe/control/recipe.service';
import { APIGatewayProxyHandler, responseOK } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import 'source-map-support/register';
import { table } from '../common';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = RecipeService.of(dbClient, table);

export const delete$: APIGatewayProxyHandler = async (event) => {
  return firstValueFrom(
    recipeService
      .delete$({
        identity: RecipeId.of(event.pathParameters.id),
      })
      .pipe(map(() => responseOK())),
  );
};

export const main = middyfy(delete$);
