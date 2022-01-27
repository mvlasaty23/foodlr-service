import { Name } from '@domain/recipe.model';
import { Region, RegionKeys } from '@domain/region.model';
import RecipeService from '@functions/recipe/control/recipe.service';
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
  return firstValueFrom(
    recipeService
      .delete$({
        region: Region.of(event.pathParameters.region as RegionKeys),
        name: Name.of(event.pathParameters.name),
      })
      .pipe(map(() => responseOK())),
  );
};

export const main = middyfy(delete$);
