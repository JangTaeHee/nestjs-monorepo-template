import { Global, Module } from '@nestjs/common';
import { SentinelConnectionOptions } from 'ioredis';
import * as ioRedisStore from 'cache-manager-ioredis';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './cache.service';
import { CacheConfigModule, CacheConfigService } from '@lib/config/cache';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<SentinelConnectionOptions | RedisClientOptions>({
      imports: [CacheConfigModule],
      useFactory: async (configService: CacheConfigService) => ({
        ...configService.option,
        store:
          configService.option && configService.option.sentinels
            ? ioRedisStore
            : redisStore,
        db: 0,
        ttl: 100000,
        isGlobal: true,
      }),
      inject: [CacheConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonCacheModule {}
