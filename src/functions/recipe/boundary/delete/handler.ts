import RecipeService from '@functions/recipe/control/recipe.service';
import { RecipeId } from '@functions/recipe/domain/recipe.model';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { APIGatewayProxyHandler, responseOK } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import 'source-map-support/register';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

export const delete$: APIGatewayProxyHandler = async (event) => {
  return firstValueFrom(recipeService.delete$(RecipeId.of(event.pathParameters.id)).pipe(map(() => responseOK())));
};

export const main = middyfy(delete$);
