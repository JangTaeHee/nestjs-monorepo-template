import { MainAppConfigService } from '@lib/config/main-app';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [MainAppConfigService],
      useFactory: async (config: MainAppConfigService) => {
        return {
          pinoHttp: {
            autoLogging: false,
            level: config.env !== 'production' ? 'debug' : 'info',
            serializers: {
              req: (req) => {
                return JSON.stringify({
                  id: req.id,
                  method: req.method,
                  url: req.url,
                  body: req.raw && req.raw.body,
                });
              },
              res: (res) => ({
                statusCode: res.statusCode,
                responseTime: res.responseTime,
              }),
            },
            transport:
              config.env !== 'production'
                ? {
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                      levelFirst: true,
                      ignore: 'pid,hostname,context',
                      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
                      messageFormat: '{context} - {msg}',
                    },
                  }
                : undefined,
            useLevelLabels: true,
            stream: process.stdout,
          },
        };
      },
    }),
  ],
})
export class CommonLoggerModule {}
