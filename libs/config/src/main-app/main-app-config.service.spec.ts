import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { MainAppConfigService } from './main-app-config.service';
import configuration from './main-app-configuration';

describe('MainConfigService', () => {
  let service: MainAppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema: Joi.object({
            NODE_ENV: Joi.string().default('local'),
            MAIN_APP_NAME: Joi.string().default('main'),
            MAIN_APP_PORT: Joi.number().default(8080),
          }),
        }),
      ],
      providers: [MainAppConfigService],
    }).compile();

    service = module.get<MainAppConfigService>(MainAppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get config', () => {
    it('should return env', async () => {
      expect(service.name).toBe(process.env.MAIN_APP_NAME);
    });
  });
});
