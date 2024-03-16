import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { SubAppConfigService } from './sub-app-config.service';
import configuration from './sub-app-configuration';

describe('SubConfigService', () => {
  let service: SubAppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema: Joi.object({
            NODE_ENV: Joi.string().default('local'),
            SUB_APP_NAME: Joi.string().default('sub'),
            SUB_APP_PORT: Joi.number().default(9090),
          }),
        }),
      ],
      providers: [SubAppConfigService],
    }).compile();

    service = module.get<SubAppConfigService>(SubAppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get config', () => {
    it('should return env', async () => {
      expect(service.name).toBe(process.env.SUB_APP_NAME);
    });
  });
});
