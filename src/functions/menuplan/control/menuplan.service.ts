import { ConsumerHabbits, Day, MenuPlan, MenuPlanBuilder } from '@domain/menuplan.model';
import { Region } from '@domain/region.model';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { firstValueFrom } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MenuplanRepository } from '../entity/menuplan.repository';

export interface IMenuPlanCreationCommand {
  user: string;
  habbits: ConsumerHabbits;
  period: {
    start: Date;
    end: Date;
  };
}

export interface IDeleteCommand {
  user: string;
  day: Day;
}

export default class MenuPlanService {
  constructor(private recipeFacade: RecipeFacade, private repository: MenuplanRepository) {}

  public async generateMenuPlan$(command: IMenuPlanCreationCommand): Promise<MenuPlan> {
    return firstValueFrom(
      this.recipeFacade.findByRegion$(Region.of('eu-central')).pipe(
        map((recipes) =>
          new MenuPlanBuilder(command.user, recipes)
            .forPeriod(command.period.start, command.period.end)
            .withHabbits(command.habbits)
            .build(),
        ),
        mergeMap((menuplan) => this.repository.save$(menuplan)),
      ),
    );
  }

  public async findMenuplans$(user: string): Promise<MenuPlan[]> {
    return this.repository.findByUser$({ user });
  }

  public async deleteMenuplan$(command: IDeleteCommand): Promise<boolean> {
    return this.repository.delete$({ user: command.user, startDay: command.day.toISOString() });
  }
}
