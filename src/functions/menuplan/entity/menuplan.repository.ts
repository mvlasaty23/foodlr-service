import { MenuPlan } from '@domain/menuplan.model';
import { Identifieable, MenuPlanEntity } from './menuplan.entity';

export class MenuplanRepository {
  constructor(private db: AWS.DynamoDB.DocumentClient, private table: string) {}

  public async findByUser$(identity: Pick<Identifieable, 'user'>): Promise<MenuPlan[]> {
    return this.db
      .query({
        TableName: this.table,
        KeyConditionExpression: '#u = :val',
        ExpressionAttributeNames: {
          '#u': 'user',
        },
        ExpressionAttributeValues: {
          ':val': identity.user,
        },
      })
      .promise()
      .then((result) => result.Items.map((item) => MenuPlanEntity.of(item).toDomain()));
  }

  public async save$(menuplan: MenuPlan): Promise<MenuPlan> {
    return this.db
      .put({
        TableName: this.table,
        Item: { ...MenuPlanEntity.from(menuplan) },
      })
      .promise()
      .then(() => menuplan);
  }

  public async delete$(identity: Identifieable): Promise<boolean> {
    return this.db
      .delete({
        TableName: this.table,
        Key: { user: identity.user, startDay: identity.startDay },
      })
      .promise()
      .then(() => true);
  }
}
