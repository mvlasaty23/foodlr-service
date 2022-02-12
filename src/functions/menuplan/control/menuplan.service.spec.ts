import { CostType } from '@domain/cost.model';
import { DurationType } from '@domain/duration.model';
import { MealType } from '@domain/mealtype.model';
import { recipes } from '@domain/mock.model';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { of } from 'rxjs';
import MenuPlanService from './menuplan.service';

describe('MenuPlanService', () => {
  const mockRecipeFacade: Partial<RecipeFacade> = {
    findByRegion$: jest.fn(),
  };
  const service = new MenuPlanService(mockRecipeFacade as RecipeFacade);

  describe('generateMenuPlan$', () => {
    it('should generate a menuplan', () => {
      // Given
      (mockRecipeFacade.findByRegion$ as jest.Mock).mockReturnValue(of(recipes));
      // When
      return service
        .generateMenuPlan$({
          user: 'mock-user',
          period: {
            start: new Date('2021-01-01'),
            end: new Date('2021-01-07'),
          },
          habbits: {
            mealsPerDay: 2,
            mealTypes: [MealType.of('all')],
            preferredCosts: [CostType.MODERATE],
            preferredPrepTime: [DurationType.FAST],
          },
        })
        .then((menuPlan) => {
          // Then
          expect(mockRecipeFacade.findByRegion$).toHaveBeenCalled();
          expect(menuPlan).toBeTruthy();
        });
    });
  });
});
