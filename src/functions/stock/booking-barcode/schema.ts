export default {
  type: 'object',
  properties: {
    barcode: { type: 'string' },
  },
  required: ['barcode'],
} as const;
