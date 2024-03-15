import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { MongoDatabaseConfigService } from './mongodb-config.service';
import configuration from './mongodb-configuration';

describe('MongoDatabaseConfigService', () => {
  let service: MongoDatabaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema: Joi.object({
            DATABASE_HOST_MONGO: Joi.string().default(
              'mongodb://127.0.0.1:27017/test',
            ),
          }),
        }),
      ],
      providers: [MongoDatabaseConfigService],
    }).compile();

    service = module.get<MongoDatabaseConfigService>(
      MongoDatabaseConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get config', () => {
    it('should return env', async () => {
      expect(service.host).toBe(process.env.DATABASE_HOST_MONGO);
    });
  });
});
