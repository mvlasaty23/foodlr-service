import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Name, Recipe, Region } from '../domain/recipe.model';
import { RecipeRespository } from '../entity/recipe.repository';

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

  public delete$(identity: RecipeIdentity): Observable<boolean> {
    return this.repository.delete$(identity);
  }
}
