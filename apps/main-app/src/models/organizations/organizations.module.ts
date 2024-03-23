import { Module } from '@nestjs/common';
import { OrganizationsModuleV1 } from './v1/organizations.module';

@Module({
  imports: [OrganizationsModuleV1],
  exports: [OrganizationsModuleV1],
})
export class OrganizationsModule {}
