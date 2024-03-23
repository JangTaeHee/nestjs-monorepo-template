import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface RedisOption {
  name?: string;
  sentinels?: any;
  host?: string;
  port?: number;
}

@Injectable()
export class CacheConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('cache.env') || 'local';
  }

  get name(): string {
    return this.configService.get<string>('cache.name') || 'redis';
  }

  get option(): RedisOption {
    let option: RedisOption;

    try {
      option = JSON.parse(
        this.configService.get<string>('cache.option') ||
          '{"host":"127.0.0.1","port":6379}',
      );
    } catch (error) {
      option = {
        host: '127.0.0.1',
        port: 6379,
      };
    }

    return option;
  }
}
