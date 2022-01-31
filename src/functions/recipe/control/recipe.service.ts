import { Recipe, RecipeId } from '@domain/recipe.model';
import { Region } from '@domain/region.model';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IRecipeIdentity {
  identity: RecipeId;
}
export default class RecipeService {
  constructor(private repository: RecipeRespository) {}
  public static of(db: AWS.DynamoDB.DocumentClient, table: string): RecipeService {
    return new RecipeService(new RecipeRespository(db, table));
  }

  public create$(recipe: Recipe): Observable<Recipe> {
    return this.repository.save$(recipe).pipe(map((it) => it));
  }

  public update$(recipe: Recipe): Observable<Recipe> {
    return this.repository.save$(recipe);
  }

  public find$(identity: IRecipeIdentity): Observable<Recipe> {
    return this.repository.find$(identity);
  }

  public findByRegion$(region: Region): Observable<Recipe[]> {
    return this.repository.findByRegion$(region);
  }

  public delete$(identity: IRecipeIdentity): Observable<boolean> {
    return this.repository.delete$(identity);
  }
}
