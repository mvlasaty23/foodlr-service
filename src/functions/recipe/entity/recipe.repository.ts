import { foodlrTable } from '@functions/common/constants';
import { AWSError } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeEntity } from './recipe.entity';

export class RecipeRespository {
  constructor(private db: AWS.DynamoDB.DocumentClient) {}

  find$(recipeId: string): Observable<RecipeEntity> {
    return from(
      this.db
        .get({
          TableName: foodlrTable,
          Key: { id: recipeId },
        })
        .promise(),
    ).pipe(map((result) => this.asRecipeEntity(result)));
  }

  create$(recipe: RecipeEntity): Observable<RecipeEntity> {
    return from(
      this.db
        .put({
          TableName: foodlrTable,
          Item: recipe,
        })
        .promise(),
    ).pipe(map((result) => this.asRecipeEntity(result)));
  }

  save$(recipe: RecipeEntity): Observable<RecipeEntity> {
    return from(
      this.db
        .update({
          TableName: foodlrTable,
          Key: { id: recipe.id },
          UpdateExpression: 'set info.rating = :r, info.plot=:p, info.actors=:a',
          ExpressionAttributeValues: {
            ':r': 5.5,
            ':p': 'Everything happens all at once.',
            ':a': ['Larry', 'Moe', 'Curly'],
          },
          ReturnValues: 'UPDATED_NEW',
        })
        .promise(),
    ).pipe(map((result) => this.asRecipeEntity(result)));
  }

  remove$(id: string): Observable<boolean> {
    return from(
      this.db
        .delete({
          TableName: foodlrTable,
          Key: { id: id },
        })
        .promise(),
    ).pipe(map(() => true));
  }

  private asRecipeEntity(
    result:
      | PromiseResult<DocumentClient.UpdateItemOutput, AWSError>
      | PromiseResult<DocumentClient.PutItemOutput, AWSError>
      | PromiseResult<DocumentClient.GetItemOutput, AWSError>,
  ): RecipeEntity {
    if (result.$response.data) {
      if ('Item' in result.$response.data) {
        return RecipeEntity.of(result.$response.data.Item);
      } else if ('Attributes' in result.$response.data) {
        return RecipeEntity.of(result.$response.data.Attributes);
      }
    }
    // FIXME: throw error
    return null as RecipeEntity;
  }
}
