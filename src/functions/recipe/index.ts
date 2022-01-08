import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.findOneHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'recipe',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      },
    },
    {
      http: {
        method: 'get',
        path: 'recipe',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      },
    },
    {
      http: {
        method: 'get',
        path: 'recipe/:id',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      },
    },
    {
      http: {
        method: 'patch',
        path: 'recipe/:id',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      },
    },
    {
      http: {
        method: 'delete',
        path: 'recipe/:id',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      },
    },
  ],
};
