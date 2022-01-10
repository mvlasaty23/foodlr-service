import { RecipeId } from '@functions/recipe/domain/recipe.model';
import { APIGatewayProxyHandler, responseOK } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import 'source-map-support/register';
import { RecipeService } from '../../control/recipe.service';
import { RecipeRespository } from '../../entity/recipe.repository';

// TODO: set region by env?
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

const remove: APIGatewayProxyHandler = async (event) => {
  return firstValueFrom(recipeService.delete$(RecipeId.of(event.pathParameters.id)).pipe(map(() => responseOK())));
};

export const main = middyfy(remove);
