import { Organization } from '../schema/organization.schema';
import { User } from '../schema/user.schema';
import { IMongoGenericRepository } from './mongo-repository-abstract';

export abstract class IMongoCollectionServices {
  abstract organizations: IMongoGenericRepository<Organization>;

  abstract users: IMongoGenericRepository<User>;
}
