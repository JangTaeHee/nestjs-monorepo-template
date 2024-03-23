import { IMongoCollectionServices } from '@lib/database/mongodb/abstracts/mongo-collection-abstract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private mongoServices: IMongoCollectionServices,
  ) {}

  async set(key: string, value: any, ttl: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      this.logger.error('[CacheService/set] Error', error);
    }
  }

  async get(key: string): Promise<any> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      this.logger.error('[CacheService/get] Error', error);
      return;
    }
  }

  del(key: string) {
    this.cacheManager.del(key);
  }

  clear() {
    this.cacheManager.reset();
  }

  async getKeys(key: string): Promise<any> {
    try {
      return await this.cacheManager.store.keys(key);
    } catch (error) {
      this.logger.error('[CacheService/getKeys] Error', error);
      return;
    }
  }

  async getAsyncOrganizationByKey(apiKey: string): Promise<any> {
    const key = `orgs:${apiKey}`;

    let organization = await this.get(key);
    if (!organization) {
      organization = await this.mongoServices.organizations.findOne({
        apiKey,
      });
      if (organization) {
        this.set(key, organization, 60 * 60 * 24);
      }
    }

    return organization;
  }
}
