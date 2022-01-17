export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    servings: { type: 'number' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          quantity: { type: 'number' },
          uom: { type: 'string' },
        },
        required: ['name', 'quantity', 'uom'],
      },
    },
    preparationTime: {
      type: 'object',
      properties: {
        quantity: { type: 'number' },
        uom: { type: 'string' },
      },
      required: ['quantity', 'uom'],
    },
    season: { type: 'string' },
    costs: { type: 'number' },
    region: { type: 'string' },
  },
  required: ['name', 'servings', 'ingredients', 'preparationTime', 'season', 'costs', 'region'],
} as const;
