import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MainAppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('mainApp.env') || 'local';
  }

  get name(): string {
    return this.configService.get<string>('mainApp.name') || 'main-app';
  }

  get port(): number {
    return this.configService.get<number>('mainApp.port') || 8080;
  }

  get swaggerUser(): string {
    return this.configService.get<string>('mainApp.swaggerUser') || 'test';
  }

  get swaggerPassword(): string {
    return this.configService.get<string>('mainApp.swaggerPassword') || 'test';
  }
}
