import { IRecipe } from '@domain/recipe.model';
import { Region } from '@domain/region.model';
import RecipeService from '@functions/recipe/control/recipe.service';
import { Observable } from 'rxjs';

export class RecipeFacade {
  private recipeService: RecipeService;

  constructor(db: AWS.DynamoDB.DocumentClient, table: string) {
    this.recipeService = RecipeService.of(db, table);
  }

  public findByRegion$(region: Region): Observable<IRecipe[]> {
    return this.recipeService.findByRegion$(region);
  }
}
