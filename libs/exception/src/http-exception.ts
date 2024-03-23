import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as R from 'ramda';

interface ResponseBody {
  status: number;
  timestamp: string;
  path: string;
  message: string;
  code?: number;
}

export const ErrorType = {
  Unauthorized: {
    code: 400401,
    message: 'Unauthorized',
    reference: 'TODO - Guide URL',
  },
  InvalidParameterType: {
    code: 400400,
    message: 'Invalid or missing parameters.',
    reference: 'TODO - Guide URL',
  },
  ResourceNotFound: {
    code: 400404,
    message: 'The requested resource could not be found.',
    reference: 'TODO - Guide URL',
  },
  TooManyRequests: {
    code: 400429,
    message: 'Too Many Requests.',
    reference: 'TODO - Guide URL',
  },
  Unknown: {
    code: 500999,
    message: 'Unknown Server Error.',
    reference: 'TODO - Guide URL',
  },
} as const;
export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private readonly httpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = ErrorType.Unknown.message;
    let code: number = ErrorType.Unknown.code;
    let reference: string = ErrorType.Unknown.reference;

    if (exception instanceof HttpException) {
      const httpException = <HttpException>exception;
      const exceptionObj: any = exception.getResponse();
      httpStatus = exception.getStatus();
      message = exceptionObj.message || httpException.message;
      code = exceptionObj && exceptionObj.code;
      reference = exceptionObj && exceptionObj.reference;

      if (Array.isArray(message) || R.equals(message, 'Unexpected field')) {
        code = ErrorType.InvalidParameterType.code;
        message = ErrorType.InvalidParameterType.message;
        reference = ErrorType.InvalidParameterType.reference;
      } else if (httpStatus === 429) {
        code = ErrorType.TooManyRequests.code;
        message = ErrorType.TooManyRequests.message;
        reference = ErrorType.TooManyRequests.reference;
      }
    } else {
      this.logger.error(
        '[AllExceptionsFilter/catch] Exception %s %s',
        exception,
        exception['stack'],
      );
    }

    const responseBody = {
      status: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
      code,
      // reference,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionObj: any = exception.getResponse();
    let message = exceptionObj.message || exception.message;
    let code = exceptionObj && exceptionObj.code;

    if (Array.isArray(message)) {
      code = ErrorType.InvalidParameterType.code;
      message = ErrorType.InvalidParameterType.message;
    }

    const responseBody: ResponseBody = {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      code: code || ErrorType.Unknown.code,
    };

    response.status(status).json(responseBody);
  }
}

export function createException(type: ErrorType) {
  let exception;

  if (type === ErrorType.Unauthorized) {
    exception = new UnauthorizedException(type);
  } else if (type === ErrorType.ResourceNotFound) {
    exception = new BadRequestException(type);
  } else if (type === ErrorType.TooManyRequests) {
    exception = new HttpException(type, 429);
  } else {
    exception = new InternalServerErrorException(ErrorType.Unknown);
  }

  return exception;
}
