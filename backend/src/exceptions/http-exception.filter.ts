import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Http Exception Filter
 *
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

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

        let message;
        if(typeof(exception.message) === "string"){
            message = {
                message: exception.message
            }
        }
        else{
            message = exception.message;
        }

        response
            .status(status)
            .json({
                timestamp: new Date().toISOString(),
                path: request.url,
                message: (exception.message.hasOwnProperty('message') ? exception.message.message : exception.message)
            });
    }
}