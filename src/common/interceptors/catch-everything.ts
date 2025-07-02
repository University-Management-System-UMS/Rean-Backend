import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

class ErrorResponse {
  message: string;
  validationMessages: Array<string>;
  statusCode: number;
  timestamp: Date;
  errorType: string;
  path: string;
}

function errorFactory(exception: Error, path: string) {
  const errorResponse = new ErrorResponse();

  errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  errorResponse.timestamp = new Date(Date.now());
  errorResponse.path = path;
  errorResponse.message = String(exception);
  errorResponse.errorType = exception['code'];
  errorResponse.validationMessages = [];

  if (exception instanceof HttpException) {
    const response = exception['response'];

    errorResponse.statusCode = exception.getStatus();
    errorResponse.message = exception['message'];
    errorResponse.errorType = exception.name ?? response['error'];
    errorResponse.validationMessages = Array.isArray(response['message'])
      ? response['message']
      : [];
  }

  return errorResponse;
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const requestQuery = request.query;

    const errorResponse = errorFactory(
      exception,
      httpAdapter.getRequestUrl(request) as string,
    );

    httpAdapter.reply(
      ctx.getResponse(),
      requestQuery.page && (requestQuery as any)?.page <= 0
        ? { ...errorResponse, data: [] }
        : errorResponse,
      errorResponse.statusCode,
    );
  }
}
