import { Controller, Post, Req, HttpCode, Body, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { EmailService } from './email.service';
import { Observable } from 'rxjs';
import { IEmail, IEmailResponse } from './interfaces/index';

/**
 * @requires Validation
 */
import { SendEmailDto } from './dto/send-email.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

/**
 * Email API endpoint 
 *
 * @export
 * @class EmailController
 */
@Controller('email')
export class EmailController {

    /**
     * Creates an instance of EmailController.
     * @param {EmailService} emailService
     * @memberof EmailController
     */
    constructor(private emailService:EmailService){}

    /**
     * POST email/send
     * Send an email 
     *
     * @param {SendEmailDto} sendEmailReq - email body 
     * @returns {Observable<any>} 
     * @memberof EmailController
     */
    @Post('send')
    @HttpCode(202)
    @UsePipes(new ValidationPipe())
    postSend(@Body() sendEmailReq: SendEmailDto): Observable<any>{

        const {
            recipients,
            sender,
            subject,
            header,
            subHeader,
            body,
            imageUrl,
            button,
            buttonUrl
        } = sendEmailReq;

        return this.emailService.sendWelcomeEmail(
            recipients,
            sender,
            subject,
            header,
            subHeader,
            body,
            imageUrl,
            button,
            buttonUrl,
        );

    }


}
