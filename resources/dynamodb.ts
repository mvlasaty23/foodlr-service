export default {
  RecipeTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:provider.environment.RECIPE_TABLE}',
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
  MenuplanTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:provider.environment.MENUPLAN_TABLE}',
      AttributeDefinitions: [
        { AttributeName: 'user', AttributeType: 'S' },
        { AttributeName: 'startDay', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'user', KeyType: 'HASH' },
        { AttributeName: 'startDay', KeyType: 'RANGE' },
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
