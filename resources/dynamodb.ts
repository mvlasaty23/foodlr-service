export default {
  FoodlrTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:provider.environment.FOODLR_TABLE}',
      AttributeDefinitions: [
        { AttributeName: 'identity', AttributeType: 'S' },
        { AttributeName: 'name', AttributeType: 'S' },
        { AttributeName: 'region', AttributeType: 'S' },
        { AttributeName: 'season', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'identity', KeyType: 'HASH' },
        { AttributeName: 'name', KeyType: 'RANGE' },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'RegionIndex',
          KeySchema: [
            { AttributeName: 'region', KeyType: 'HASH' },
            { AttributeName: 'season', KeyType: 'RANGE' },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
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
