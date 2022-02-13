export default {
  type: 'object',
  properties: {
    startDay: { type: 'string' },
    endDay: { type: 'string' },
    recipes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          servings: { type: 'number' },
          ingredients: {
            type: 'array',
            items: {
              type: 'object',
              properties: { name: { type: 'string' }, uom: { type: 'string' }, quantity: { type: 'number' } },
            },
          },
          preparationTime: { type: 'number' },
          season: { type: 'string' },
          costs: { type: 'number' },
          region: { type: 'string' },
        },
        required: ['name', 'servings', 'ingredients', 'preparationTime', 'season', 'costs', 'region'],
      },
    },
  },
  required: ['recipes', 'startDay', 'endDay'],
} as const;
