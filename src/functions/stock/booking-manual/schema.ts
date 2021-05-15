export default {
  type: 'object',
  properties: {
    productGroup: { type: 'string' },
    amount: { type: 'number' },
    uom: { type: 'string' },
    barcode: { type: 'string' },
  },
  required: ['productGroup', 'amount', 'uom'],
} as const;
