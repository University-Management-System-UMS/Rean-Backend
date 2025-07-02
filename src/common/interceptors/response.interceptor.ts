import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

interface IResponse<T> {
  message: string;
  statusCode: number;
  data: T;
  processTime: number;
  axiosProcessTime?: number;
}
class KResponse<T> {
  public message: string;
  public statusCode: number;
  public data: T;
  public elapsedTime: number;
  public axiosElapsedTime?: number;

  constructor(response: IResponse<T>) {
    this.message = response.message;
    this.statusCode = response.statusCode;
    this.data = response.data;
    this.elapsedTime = response.processTime;
    this.axiosElapsedTime = response.axiosProcessTime;
  }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp();
    const statusCode = request.getResponse().statusCode;

    const startDate = Date.now();

    return next.handle().pipe(
      map((data) => {
        const kResponse = new KResponse({
          message: data?.message ?? 'Success',
          statusCode: data?.statusCode ?? statusCode,
          data: data?.data ?? data,
          processTime: (Date.now() - startDate) / 1000,
        });

        return kResponse;
      }),
    );
  }
}
