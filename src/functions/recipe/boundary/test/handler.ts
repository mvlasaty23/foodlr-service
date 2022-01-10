import { formatJSONResponse, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'source-map-support/register';
import { default as schema } from '../dto/test.dto.schema';

const test: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return firstValueFrom(
    of({
      pathParam: event.pathParameters,
      body: event.body,
    }).pipe(map((item) => formatJSONResponse(item))),
  );
};

export const main = middyfy(test);
