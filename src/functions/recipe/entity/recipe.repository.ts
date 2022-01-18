import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeIdentity } from '../control/recipe.service';
import { Recipe } from '../domain/recipe.model';
import { RecipeEntity } from './recipe.entity';

export class RecipeRespository {
  constructor(private db: AWS.DynamoDB.DocumentClient, private table: string) {}

  public find$({ region, name }: RecipeIdentity): Observable<Recipe> {
    return from(
      this.db
        .get({
          TableName: this.table,
          Key: { region: region.value, name: name.value },
        })
        .promise(),
    ).pipe(map((result) => RecipeEntity.of(result.Item).toDomain()));
  }

  public save$(recipe: Recipe): Observable<Recipe> {
    return from(
      this.db
        .put({
          TableName: this.table,
          Item: { ...RecipeEntity.from(recipe) },
        })
        .promise(),
    ).pipe(map(() => recipe));
  }

  public delete$({ name, region }: RecipeIdentity): Observable<boolean> {
    return from(
      this.db
        .delete({
          TableName: this.table,
          Key: { region: region.value, name: name.value },
        })
        .promise(),
    ).pipe(map(() => true));
  }
}
