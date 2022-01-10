import { formatJSONResponse } from '@libs/apiGateway';
import { map } from 'rxjs/operators';
import { Recipe } from '../domain/recipe.model';

export const mapToJsonResponse = map((created: Recipe) => formatJSONResponse({ ...created }));
