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
              required: ['name', 'uom', 'quantity'],
            },
          },
          preparationTime: { type: 'number' },
          season: { type: 'string' },
          costs: { type: 'number' },
          region: { type: 'string' },
          type: { type: 'string' },
        },
        required: ['name', 'servings', 'ingredients', 'preparationTime', 'season', 'costs', 'region', 'type'],
      },
    },
  },
  required: ['recipes', 'startDay', 'endDay'],
} as const;
