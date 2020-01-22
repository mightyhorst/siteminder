import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Http Exception Filter
 *
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    /**
     * Catch handler 
     *
     * @param {HttpException} exception
     * @param {ArgumentsHost} host
     * @memberof HttpExceptionFilter
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
                name: exception.name,
                statusMessage: response.statusMessage
            });
    }
}