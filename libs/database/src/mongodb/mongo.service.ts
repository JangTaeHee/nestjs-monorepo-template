import {
  Organization,
  OrganizationDocument,
} from './schema/organization.schema';
import { User, UserDocument } from './schema/user.schema';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMongoCollectionServices } from './abstracts/mongo-collection-abstract';
import { MongoGenericRepository } from './mongo.repository';

@Injectable()
export class MongoDBService
  implements IMongoCollectionServices, OnApplicationBootstrap
{
  organizations: MongoGenericRepository<Organization>;
  users: MongoGenericRepository<User>;

  constructor(
    @InjectModel(Organization.name)
    private OrganizationRepository: Model<OrganizationDocument>,
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
  ) {}

  async onApplicationBootstrap() {
    this.organizations = new MongoGenericRepository<Organization>(
      this.OrganizationRepository,
    );
    this.users = new MongoGenericRepository<User>(this.UserRepository);
  }
}
