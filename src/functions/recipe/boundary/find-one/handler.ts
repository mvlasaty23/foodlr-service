import { RecipeId } from '@domain/recipe.model';
import { mapToRecipeDto, table } from '@functions/recipe/boundary/common';
import RecipeService from '@functions/recipe/control/recipe.service';
import { APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import 'source-map-support/register';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = RecipeService.of(dbClient, table);

export const findOne$: APIGatewayProxyHandler = async (event) => {
  return firstValueFrom(recipeService.find$({ identity: RecipeId.of(event.pathParameters.id) }).pipe(mapToRecipeDto));
};

export const main = middyfy(findOne$);
