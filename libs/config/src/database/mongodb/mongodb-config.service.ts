import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoDatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return (
      this.configService.get<string>('database_url.mongo') ||
      'mongodb://127.0.0.1:27017/test'
    );
  }
}
