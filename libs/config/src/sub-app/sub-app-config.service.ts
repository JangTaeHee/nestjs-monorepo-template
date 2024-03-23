import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubAppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('subApp.env') || 'local';
  }

  get name(): string {
    return this.configService.get<string>('subApp.name') || 'sub-app';
  }

  get port(): number {
    return this.configService.get<number>('subApp.port') || 9090;
  }

  get swaggerUser(): string {
    return this.configService.get<string>('subApp.swaggerUser') || 'test';
  }

  get swaggerPassword(): string {
    return this.configService.get<string>('subApp.swaggerPassword') || 'test';
  }
}
