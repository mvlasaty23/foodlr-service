export default {
  type: 'object',
  properties: {
    'x-user-id': { type: 'string' },
  },
  required: ['x-user-id'],
} as const;
