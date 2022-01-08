// TODO: add ProductTable
export default {
  FoodlrTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:provider.environment.FOODLR_TABLE}',
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'groupKey', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'groupKey', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits:
          '${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}',
        WriteCapacityUnits:
          '${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}',
      },
    },
  },
};
