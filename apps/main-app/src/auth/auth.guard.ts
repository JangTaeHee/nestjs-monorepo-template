import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as R from 'ramda';
import { CacheService } from '@lib/cache';
import { Organization } from '@lib/database/mongodb/schema/organization.schema';
import { ErrorType, createException } from '@lib/exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // public request
    if (req.originalUrl === '/health') {
      return true;
    }

    // api request
    const apiKey: string = req.get('ORGANIZATION_API_KEY');

    if (R.isNil(apiKey) || R.isEmpty(apiKey)) {
      throw createException(ErrorType.Unauthorized);
    }

    const organization: Organization = <Organization>(
      await this.cacheService.getAsyncOrganizationByKey(apiKey)
    );

    if (
      R.isNil(organization) ||
      R.isEmpty(organization) ||
      organization.apiKey !== apiKey
    ) {
      throw createException(ErrorType.Unauthorized);
    }

    req.auth = {
      organization,
    };

    return true;
  }
}
