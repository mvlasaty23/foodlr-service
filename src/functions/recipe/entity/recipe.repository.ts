import { Recipe } from '@domain/recipe.model';
import { Region } from '@domain/region.model';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRecipeIdentity } from '../control/recipe.service';
import { RecipeEntity } from './recipe.entity';

export class RecipeRespository {
  constructor(private db: AWS.DynamoDB.DocumentClient, private table: string) {}

  public find$({ identity }: IRecipeIdentity): Observable<Recipe> {
    return from(
      this.db
        .get({
          TableName: this.table,
          Key: { identity: identity.value },
        })
        .promise(),
    ).pipe(map((result) => RecipeEntity.of(result.Item).toDomain()));
  }

  public save$(recipe: Recipe): Observable<Recipe> {
    const recipeEntity = RecipeEntity.from(recipe);
    return from(
      this.db
        .put({
          TableName: this.table,
          Item: { ...recipeEntity },
        })
        .promise(),
    ).pipe(map(() => recipeEntity.toDomain()));
  }

  public delete$({ identity }: IRecipeIdentity): Observable<boolean> {
    return from(
      this.db
        .delete({
          TableName: this.table,
          Key: { identity: identity.value },
        })
        .promise(),
    ).pipe(map(() => true));
  }

  public findByRegion$(region: Region): Observable<Recipe[]> {
    return from(
      this.db
        .query({
          TableName: this.table,
          IndexName: 'RegionIndex',
          KeyConditionExpression: '#rg = :val',
          ExpressionAttributeNames: {
            '#rg': 'region',
          },
          ExpressionAttributeValues: {
            ':val': region.value,
          },
        })
        .promise(),
    ).pipe(map((result) => result.Items.map((item) => RecipeEntity.of(item).toDomain())));
  }
}
