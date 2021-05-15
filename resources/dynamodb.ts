export default {
  StockTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Retain",
    Properties: {
      TableName: "${self:provider.environment.STOCK_TABLE}",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: "${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}",
        WriteCapacityUnits: "${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}",
      },
    },
  },
  RecipeTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Retain",
    Properties: {
      TableName: "${self:provider.environment.RECIPE_TABLE}",
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        // { AttributeName: "listId", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        // { AttributeName: "listId", KeyType: "RANGE" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: "${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}",
        WriteCapacityUnits: "${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}",
      },
    },
  },
};
