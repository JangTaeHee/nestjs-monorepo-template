import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MainAppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('main_app.env') || 'local';
  }

  get name(): string {
    return this.configService.get<string>('main_app.name') || 'local';
  }

  get port(): string {
    return this.configService.get<string>('main_app.port') || 'local';
  }
}
