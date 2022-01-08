import { RecipeRespository } from '../entity/recipe.repository';

export class RecipeService {
  constructor(private repository: RecipeRespository) {}
  public create$(): void {
    return;
  }
}
