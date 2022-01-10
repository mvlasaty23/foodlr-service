import { Observable } from 'rxjs';
import { RecipeRespository } from '../entity/recipe.repository';
import { Recipe, RecipeId } from '../domain/recipe.model';

export class RecipeService {
  constructor(private repository: RecipeRespository) {}
  public create$(recipe: Recipe): Observable<RecipeId> {
    return this.repository.create$(recipe);
  }

  public update$(recipe: Recipe): Observable<Recipe> {
    return this.repository.save$(recipe);
  }

  public find$(recipeId: RecipeId): Observable<Recipe> {
    return this.repository.find$(recipeId);
  }

  public delete$(recipeId: RecipeId): Observable<boolean> {
    return this.repository.delete$(recipeId);
  }
}
