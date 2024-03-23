import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { CacheConfigService } from './cache-config.service';
import configuration from './cache-configuration';

describe('MqttConfigService', () => {
  let service: CacheConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema: Joi.object({
            NODE_ENV: Joi.string().default('local'),
            REDIS_NAME: Joi.string().default('redis'),
            REDIS_OPTION: Joi.string().default(
              '{"host":"127.0.0.1","port":6379}',
            ),
          }),
        }),
      ],
      providers: [CacheConfigService],
    }).compile();

    service = module.get<CacheConfigService>(CacheConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get config', () => {
    it('should return env', async () => {
      expect(service.env).toBe(process.env.NODE_ENV);
    });
  });
});
