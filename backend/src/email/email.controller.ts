import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { EmailService } from './email.service';
import { Observable } from 'rxjs';
import { IEmail, IEmailResponse } from './interfaces/index';

@Controller('email')
export class EmailController {

    constructor(private emailService:EmailService){}

    @Post('send')
    @HttpCode(202)
    postSend(@Req() req: Request): Observable<any>{

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
        } = req.body;

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
