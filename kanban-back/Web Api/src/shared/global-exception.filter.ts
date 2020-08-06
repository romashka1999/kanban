import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus, HttpException } from '@nestjs/common';
import { ResponseCreator } from './response-creator.class';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getResponse();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const body = exception instanceof HttpException ? exception.getResponse() : 'INTERNAL_SERVER_ERROR';

        const { url, method } = request.req;

        response.status(status).json(new ResponseCreator(status, false, url, method, body));
    }
}
