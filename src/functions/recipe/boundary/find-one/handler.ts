import { APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import 'source-map-support/register';
import { RecipeService } from '../../control/recipe.service';
import { RecipeId } from '../../domain/recipe.model';
import { RecipeRespository } from '../../entity/recipe.repository';
import { mapToJsonResponse } from '../common';

// TODO: set region by env?
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

const findOne: APIGatewayProxyHandler = async (event) => {
  return firstValueFrom(recipeService.find$(RecipeId.of(event.pathParameters.id)).pipe(mapToJsonResponse));
};

export const main = middyfy(findOne);
