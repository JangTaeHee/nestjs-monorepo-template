import { User, UserSchema } from './schema/user.schema';
import {
  MongoDatabaseConfigModule,
  MongoDatabaseConfigService,
} from '@lib/config/database/mongodb';
import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBService } from './mongo.service';
import { IMongoCollectionServices } from './abstracts/mongo-collection-abstract';
import { Organization, OrganizationSchema } from './schema/organization.schema';

@Module({
  imports: [
    MongoDatabaseConfigModule,
    MongooseModule.forRootAsync({
      imports: [MongoDatabaseConfigModule],
      useFactory: async (configService: MongoDatabaseConfigService) => ({
        uri: configService.host,
      }),
      inject: [MongoDatabaseConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Organization.name,
        useFactory: () => {
          const schema = OrganizationSchema;
          return schema;
        },
      },
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [
    Logger,
    {
      provide: IMongoCollectionServices,
      useClass: MongoDBService,
    },
  ],
  exports: [IMongoCollectionServices],
})
export class MongoDBModule {}
