import { handlerPath } from '@libs/handlerResolver';
import { default as schema } from '../dto/test.dto.schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'recipe/test/{id}',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
