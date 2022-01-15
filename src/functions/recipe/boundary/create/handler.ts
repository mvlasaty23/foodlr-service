import schema from '@functions/recipe/boundary/dto/recipe.dto.schema';
import RecipeService from '@functions/recipe/control/recipe.service';
import { Recipe } from '@functions/recipe/domain/recipe.model';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import 'source-map-support/register';

// AWS.config.update({ region: process.env.REGION });
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

export const create$: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return firstValueFrom(
    recipeService.create$(Recipe.create(event.body.name, event.body.servings)).pipe(
      map((id) => ({ id: id.value })),
      map(formatJSONResponse),
    ),
  );
};

export const main = middyfy(create$);
