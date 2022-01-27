import { Name } from '@domain/recipe.model';
import { Region, RegionKeys } from '@domain/region.model';
import { mapToRecipeDto } from '@functions/recipe/boundary/common';
import RecipeService from '@functions/recipe/control/recipe.service';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import 'source-map-support/register';

const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

export const findOne$: APIGatewayProxyHandler = async (event) => {
  return firstValueFrom(
    recipeService
      .find$({ region: Region.of(event.pathParameters.region as RegionKeys), name: Name.of(event.pathParameters.name) })
      .pipe(mapToRecipeDto),
  );
};

export const main = middyfy(findOne$);
