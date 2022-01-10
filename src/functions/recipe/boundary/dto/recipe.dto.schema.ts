export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    servings: { type: 'number' },
  },
  required: ['name', 'servings'],
} as const;
