// ** Nest Imports
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// ** Type Imports
import type { CommonResponseType } from '../types';

// ** Utils Imports
import { ClientProxy } from '@nestjs/microservices';
import RequestLogDto from '../dto/request-log.dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('RMQ_LOG_QUE') private readonly rmqClient: ClientProxy) {}

  private logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(
      `${request.method} : ${request.url} ${JSON.stringify(
        request.query,
      )} ${JSON.stringify(request.body)}`,
    );

    return next.handle().pipe(
      tap({
        next: (response: CommonResponseType) => {
          this.logger.log(`${response.statusCode} : ${response.message}`);
          this.rmqClient
            .emit<RequestLogDto>('request-log', {
              requestUrl: request.url,
              requestBody: request.body,
              requestMethod: request.method,
              responseBody: response,
              serverName: 'core-server',
              userId: request.user ? request.user.email : '',
              ip: request.ip,
            })
            .toPromise()
            .catch((err) => {
              console.log(err);
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: (error: Error) => {},
      }),
    );
  }
}
