import { Region } from '@domain/region.model';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsumerHabbits, MenuPlan, MenuPlanBuilder } from '@domain/menuplan.model';

export interface IMenuPlanCreationCommand {
  habbits: ConsumerHabbits;
  period: {
    start: Date;
    end: Date;
  };
}

export default class MenuPlanService {
  constructor(private recipeFacade: RecipeFacade) {}

  public async generateMenuPlan$(command: IMenuPlanCreationCommand): Promise<MenuPlan> {
    return firstValueFrom(
      this.recipeFacade
        .findByRegion$(Region.of('eu-central'))
        .pipe(
          map((recipes) =>
            new MenuPlanBuilder(recipes)
              .forPeriod(command.period.start, command.period.end)
              .withHabbits(command.habbits)
              .build(),
          ),
        ),
    );
  }
}
