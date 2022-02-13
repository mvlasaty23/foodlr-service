import { CostType } from '@domain/cost.model';
import { DurationType } from '@domain/duration.model';
import { MealType } from '@domain/mealtype.model';
import { Day } from '@domain/menuplan.model';
import { menuplan, recipes } from '@domain/mock.model';
import { RecipeFacade } from '@functions/recipe/api/recipe.facade';
import { of } from 'rxjs';
import { MenuplanRepository } from '../entity/menuplan.repository';
import MenuPlanService from './menuplan.service';

describe('MenuPlanService', () => {
  const mockRecipeFacade: Partial<RecipeFacade> = {
    findByRegion$: jest.fn(),
  };
  const mockRepository: Partial<MenuplanRepository> = {
    findByUser$: jest.fn(),
    save$: jest.fn(),
    delete$: jest.fn(),
  };
  const service = new MenuPlanService(mockRecipeFacade as RecipeFacade, mockRepository as MenuplanRepository);

  describe('generateMenuPlan$', () => {
    it('should generate a menuplan', () => {
      // Given
      (mockRecipeFacade.findByRegion$ as jest.Mock).mockReturnValue(of(recipes));
      (mockRepository.save$ as jest.Mock).mockImplementation((input) => Promise.resolve(input));
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
  describe('findMenuplans$', () => {
    it('should return a list of menuplan', () => {
      // Given
      const user = 'mockuser';
      (mockRepository.findByUser$ as jest.Mock).mockReturnValue(Promise.resolve([]));
      // When
      return service.findMenuplans$(user).then((menuplans) => {
        // Then
        expect(menuplans).toBeTruthy();
        expect(mockRepository.findByUser$).toHaveBeenCalledWith({ user });
      });
    });
  });
  describe('deleteMenuplan$', () => {
    it('should call repository.delete$', () => {
      // Given
      const command = { user: 'mockuser', day: Day.of('2022-02-12') };
      (mockRepository.delete$ as jest.Mock).mockReturnValue(Promise.resolve(true));
      // When
      return service.deleteMenuplan$(command).then((result) => {
        expect(result).toBeTruthy();
        expect(mockRepository.delete$).toHaveBeenCalled();
      });
    });
  });
  describe('updateMenuplan$', () => {
    it('should call repository.save$', () => {
      // Given
      const command = { menuplan };
      (mockRepository.save$ as jest.Mock).mockReturnValue(Promise.resolve(menuplan));
      // When
      return service.updateMenuplan$(command).then((result) => {
        expect(result).toBeTruthy();
        expect(mockRepository.save$).toHaveBeenCalled();
      });
    });
  });
});
