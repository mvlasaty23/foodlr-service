import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe, RecipeId } from '../domain/recipe.model';
import { RecipeEntity } from './recipe.entity';

export class RecipeRespository {
  constructor(private db: AWS.DynamoDB.DocumentClient, private table: string) {}

  public find$(id: RecipeId): Observable<Recipe> {
    return from(
      this.db
        .get({
          TableName: this.table,
          Key: { id: id.value, groupKey: 'recipe' },
        })
        .promise(),
    ).pipe(map((result) => RecipeEntity.of(result.Item).toDomain()));
  }

  // TODO: replace with save$
  public create$(recipe: Recipe): Observable<RecipeId> {
    return from(
      this.db
        .put({
          TableName: this.table,
          Item: { ...RecipeEntity.from(recipe) },
        })
        .promise(),
    ).pipe(map(() => recipe.id));
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

  public delete$(id: RecipeId): Observable<boolean> {
    return from(
      this.db
        .delete({
          TableName: this.table,
          Key: { id: id.value, groupKey: 'recipe' },
        })
        .promise(),
    ).pipe(map(() => true));
  }
}
