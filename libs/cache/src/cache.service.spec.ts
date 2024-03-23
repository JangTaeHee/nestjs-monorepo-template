import { CacheConfigModule, CacheConfigService } from '@lib/config/cache';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisClientOptions } from 'redis';
import { CacheService } from './cache.service';
import { DataServicesModule } from '@lib/database/data-services.module';
import { CacheModule } from '@nestjs/cache-manager';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.registerAsync<RedisClientOptions>({
          imports: [CacheConfigModule],
          useFactory: async (configService: CacheConfigService) => ({
            isGlobal: true,
            host: configService.option.host,
            port: configService.option.port,
            ttl: 60 * 60, // 60 minutes
          }),
          inject: [CacheConfigService],
        }),
        DataServicesModule,
      ],
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
