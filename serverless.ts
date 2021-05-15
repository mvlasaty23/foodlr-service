import type { AWS } from '@serverless/typescript';

import bookingManual from '@functions/stock/booking-manual';
import bookingBarcode from '@functions/stock/booking-barcode';

import dynamodbTables from 'resources/dynamodb';

// TODO: use validate.js or aws request schema?
const serverlessConfiguration: AWS = {
  service: 'foodlr-service',
  frameworkVersion: '2',
  custom: {
    // webpack: {
    //   webpackConfig: "./webpack.config.js",
    //   includeModules: true,
    // },
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    stock_table: '${self:service}-stock-table-${opt:stage, self:provider.stage}',
    recipe_table: '${self:service}-recipe-table-${opt:stage, self:provider.stage}',
    table_throughputs: {
      prod: 1,
      default: 1,
    },
    table_throughput: '${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}',
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      },
    },
    ['serverless-offline']: {
      httpPort: 3000,
      babelOptions: {
        presets: ['env'],
      },
    },
  },
  plugins: [
    // TODO: replace sls-webpack with serverless-bundle - not executing after?
    'serverless-webpack',
    // TODO: add dynamodb local vars to .env?
    'serverless-dynamodb-local',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  // TODO: add serverless-bundle, with custom tsconfig
  package: {
    individually: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-central-1',
    lambdaHashingVersion: '20201221',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:custom.region}',
      STAGE: '${self:custom.stage}',
      STOCK_TABLE: '${self:custom.stock_table}',
      RECIPE_TABLE: '${self:custom.recipe_table}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: [{ 'Fn::GetAtt': ['StockTable', 'Arn'] }, { 'Fn::GetAtt': ['RecipeTable', 'Arn'] }],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { bookingManual, bookingBarcode },
  resources: {
    Resources: dynamodbTables,
  },
};

module.exports = serverlessConfiguration;
