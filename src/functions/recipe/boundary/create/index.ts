import { handlerPath } from '@libs/handlerResolver';
import schema from '../dto/recipe.dto.schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'recipe',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
