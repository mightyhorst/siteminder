import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service'
import { HttpModule } from '@nestjs/common';
import {Request} from 'express';
import { asap } from 'rxjs/internal/scheduler/asap';

import { mockBody, MockEmailService } from '../../__mocks__/mock.email.service';
import { SendEmailDto } from "./dto/send-email.dto";

import httpMocks = require('node-mocks-http');


describe('Email Controller', () => {
    let controller: EmailController;
    const mockEmailService = new MockEmailService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmailController],
            providers: [EmailService],
            imports: [HttpModule]
        })
            .overrideProvider(EmailService)
            .useValue(mockEmailService)
            .compile();

        controller = module.get<EmailController>(EmailController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should send email', async(done) => {

        // const req = httpMocks.createRequest()
        // req.body = mockBody;

        const sendEmailBody: SendEmailDto = <SendEmailDto>mockBody;

        const response = await controller.postSend(sendEmailBody);

        response.subscribe(
            emailResponse => {
                
                expect(emailResponse.status).toEqual(202);
                expect(emailResponse.statusText).toEqual('Accepted'); 
                expect(emailResponse.data).toEqual('');

                done();
            }
        )

    })
});
