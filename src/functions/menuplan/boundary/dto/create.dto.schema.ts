export default {
  type: 'object',
  properties: {
    habbits: {
      type: 'object',
      properties: {
        mealsPerDay: { type: 'number' },
        types: {
          type: 'array',
          items: {
            enum: ['all', 'meat', 'pescetarian', 'vegetarian', 'vegan'],
          },
        },
        prepTimes: {
          type: 'array',
          items: {
            enum: ['FAST', 'MODERATE', 'ELABORATE', 'LONGJOB'],
          },
        },
        costs: {
          type: 'array',
          items: {
            enum: ['LOW', 'MODERATE', 'EXPENSIVE'],
          },
        },
      },
      required: ['mealsPerDay', 'types', 'prepTimes', 'costs'],
    },
    period: {
      type: 'object',
      properties: {
        start: { type: 'string' },
        end: { type: 'string' },
      },
      required: ['start', 'end'],
    },
  },
  required: ['habbits', 'period'],
} as const;
