import { createException, ErrorType } from '@lib/exception/http-exception';
import { IMongoCollectionServices } from '@lib/database/mongodb/abstracts/mongo-collection-abstract';
import { MongoOption } from '@lib/database/mongodb/interfaces/repository.interface';
import { Organization } from '@lib/database/mongodb/schema/organization.schema';
import { Injectable, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);
  constructor(private mongoServices: IMongoCollectionServices) {}

  async findOne(
    organizationApiKey: string,
  ): Promise<Omit<Organization, Exclude<keyof mongoose.Document, 'id'>>> {
    this.logger.log(
      '[OrganizationsService/findOne] call - organizationApiKey=%s',
      organizationApiKey,
    );

    const option: MongoOption = {
      lean: true,
    };

    const organization = await this.mongoServices.organizations.findOne(
      { apiKey: organizationApiKey },
      option,
    );

    return organization;
  }
}
