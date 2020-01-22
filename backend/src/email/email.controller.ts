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


@Controller('email')
export class EmailController {

    constructor(private emailService:EmailService){}

    @Post('send')
    @HttpCode(202)
    // postSend(@Req() req: Request): Observable<any>{
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
