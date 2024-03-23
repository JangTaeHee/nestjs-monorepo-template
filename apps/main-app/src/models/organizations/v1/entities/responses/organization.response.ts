import { ApiResponseProperty } from '@nestjs/swagger';

export class OrganizationResponse {
  @ApiResponseProperty({ type: String, example: 'Organization ID' })
  organizationId: string;

  @ApiResponseProperty({ type: String, example: 'Organization Name' })
  name: string;

  @ApiResponseProperty({ type: String, example: 'Organization API Key' })
  apiKey: string;

  @ApiResponseProperty({ type: Number, example: 1658977173917 })
  createdAt: Date;

  @ApiResponseProperty({ type: Number, example: 1658977173917 })
  updatedAt: Date;
}
