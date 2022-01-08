import { foodlrTable } from '@functions/common/constants';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { firstValueFrom, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import 'source-map-support/register';
import schema from './schema';

const dbClient = new AWS.DynamoDB.DocumentClient();
// TODO: set region by env?

const bookingManual: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  // First check if we have this product in our stock pile
  return firstValueFrom(
    from(
      dbClient
        .get({
          TableName: foodlrTable,
          Key: { id: event.body.productGroup },
        })
        .promise(),
    ).pipe(
      map((result) => result.Item),
      // TODO: use iif?
      mergeMap((stockItem) => {
        if (stockItem) {
          return dbClient
            .update({
              TableName: foodlrTable,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Key: stockItem.id,
            })
            .promise();
        } else {
          return dbClient
            .put({
              TableName: foodlrTable,
              Item: {
                productGroup: event.body.productGroup,
                user: 'mvlasaty',
                uom: event.body.productGroup,
                amount: event.body.amount,
                barcodes: [event.body.barcode],
              },
            })
            .promise();
        }
      }),
      map(() =>
        formatJSONResponse({
          ...event.body,
        }),
      ),
    ),
  );
};

export const main = middyfy(bookingManual);
