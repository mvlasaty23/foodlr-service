export default {
  FoodlrTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:provider.environment.FOODLR_TABLE}',
      AttributeDefinitions: [
        { AttributeName: 'region', AttributeType: 'S' },
        { AttributeName: 'name', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'region', KeyType: 'HASH' },
        { AttributeName: 'name', KeyType: 'RANGE' },
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
