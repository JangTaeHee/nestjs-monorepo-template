import { Controller, Get, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { OrganizationResponse } from './entities/responses/organization.response';
import { OrganizationsService } from './organizations.service';
import { Organization } from '@lib/database/mongodb/schema/organization.schema';

@ApiTags('organizations')
@ApiBearerAuth('ORGANIZATION_API_KEY')
@ApiResponse({
  status: 200,
  description: 'success',
})
@SkipThrottle()
@Controller({
  version: '1',
  path: 'organizations',
})
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiOperation({
    summary: 'organization view api',
    description: 'Returns organization information.',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: OrganizationResponse,
  })
  @Get('information')
  findOne(@Req() req: any) {
    const organization: Organization = req.auth && req.auth.organization;
    return organization;
  }
}
