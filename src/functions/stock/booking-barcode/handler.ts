import type { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { firstValueFrom, of } from 'rxjs';
import 'source-map-support/register';
import schema from './schema';

const bookingBarcode: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return firstValueFrom(
    of(
      formatJSONResponse({
        message: `Barcode booking success!`,
        event,
      }),
    ),
  );
};

export const main = middyfy(bookingBarcode);
