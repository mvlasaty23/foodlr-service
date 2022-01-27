import { Name, Recipe } from '@domain/recipe.model';
import { Region } from '@domain/region.model';
import { RecipeRespository } from '@functions/recipe/entity/recipe.repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RecipeIdentity {
  region: Region;
  name: Name;
}
export default class RecipeService {
  constructor(private repository: RecipeRespository) {}
  public create$(recipe: Recipe): Observable<Recipe> {
    return this.repository.save$(recipe).pipe(map((it) => it));
  }

  public update$(recipe: Recipe): Observable<Recipe> {
    return this.repository.save$(recipe);
  }

  public find$(identity: RecipeIdentity): Observable<Recipe> {
    return this.repository.find$(identity);
  }

  public findByRegion$(region: Region): Observable<Recipe[]> {
    return this.repository.findByRegion$(region);
  }

  public delete$(identity: RecipeIdentity): Observable<boolean> {
    return this.repository.delete$(identity);
  }
}
