import { MenuPlan } from '@domain/menuplan.model';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';

export const menuplanTable = process.env.MENUPLAN_TABLE;

export type IMenuplanDto = {
  startDay: string;
  endDay: string;
  recipes: {
    name: string;
    servings: number;
    ingredients: {
      name: string;
      quantity: number;
      uom: string;
    }[];
    preparationTime: number;
    season: string;
    costs: number;
    region: string;
    type: string;
  }[];
};

function menuplanDto(menuPlan: MenuPlan): IMenuplanDto {
  return {
    startDay: menuPlan.start.toISOString(),
    endDay: menuPlan.end.toISOString(),
    recipes: menuPlan.recipes.map((recipe) => ({
      name: recipe.name.value,
      servings: recipe.servings.value,
      ingredients: recipe.ingredients.map((it) => ({
        name: it.name.value,
        quantity: it.amount.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        uom: it.amount.uom,
      })),
      preparationTime: recipe.preparationTime.value,
      season: recipe.season.value,
      costs: recipe.costs.value,
      region: recipe.region.value,
      type: recipe.type.value,
    })),
  };
}
export const formatMenuplan = (menuPlan: MenuPlan): APIGatewayProxyResult => formatJSONResponse(menuplanDto(menuPlan));
export const formatMenuplans = (menuplans: MenuPlan[]): APIGatewayProxyResult =>
  formatJSONResponse(menuplans.map(menuplanDto));
