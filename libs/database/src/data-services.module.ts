import { Global, Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb';

@Global()
@Module({
  imports: [MongoDBModule],
  exports: [MongoDBModule],
})
export class DataServicesModule {}
