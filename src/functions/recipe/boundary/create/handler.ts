import { formatJSONResponse, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import 'source-map-support/register';
import { RecipeService } from '../../control/recipe.service';
import { Recipe } from '../../domain/recipe.model';
import { RecipeRespository } from '../../entity/recipe.repository';
import schema from '../dto/recipe.dto.schema';

AWS.config.update({ region: 'eu-central-1' });
const dbClient = new AWS.DynamoDB.DocumentClient();
const recipeService = new RecipeService(new RecipeRespository(dbClient, process.env.FOODLR_TABLE));

const create: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return firstValueFrom(
    recipeService.create$(Recipe.create(event.body.name, event.body.servings)).pipe(
      map((id) => ({ id: id.value })),
      map(formatJSONResponse),
    ),
  );
};

export const main = middyfy(create);
