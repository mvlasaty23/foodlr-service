import { Recipe } from '@functions/recipe/domain/recipe.model';
import { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import { RecipeService } from '../../control/recipe.service';
import { RecipeRespository } from '../../entity/recipe.repository';
import { mapToJsonResponse } from '../common';
import schema from '../dto/recipe.dto.schema';

// TODO: set region by env?
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

// eslint-disable-next-line @typescript-eslint/require-await
const update: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return firstValueFrom(
    recipeService
      .update$(Recipe.of(event.pathParameters.id, event.body.name, event.body.servings))
      .pipe(mapToJsonResponse),
  );
};

export const main = middyfy(update);
