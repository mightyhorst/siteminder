import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';

import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { EmailService } from './email.service';
import { mockBody } from '../../__mocks__/mock.email.service';

const axiosResponse: AxiosResponse = {
    status: 202,
    statusText: 'Accepted',
    headers: {},
    config: {},
    data: {}
}


describe('EmailService', () => {
    let service: EmailService;

    // let mockHttpService = {
    //   post: jest.fn((
    //       sendgridUrl, 
    //       postData, 
    //       axiosConfig
    //   )=> of(axiosResponse))

    let mockHttpService = {
        post: jest.fn(() => of(axiosResponse))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EmailService],
            imports: [HttpModule],
        })
            .overrideProvider(HttpService)
            .useValue(mockHttpService)
            .compile();

        service = module.get<EmailService>(EmailService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call http service', async(done) => {

        service
            .sendWelcomeEmail(
                mockBody.recipients,
                mockBody.sender,
                mockBody.subject,
                mockBody.header,
                mockBody.subHeader,
                mockBody.body,
                mockBody.imageUrl,
                mockBody.button,
                mockBody.buttonUrl
            )
            .subscribe(emailResponse => {
                expect(mockHttpService.post).toHaveBeenCalled();
                done();
            })
        

    })
    
    
    it('should return the email response ', async(done) => {

        service
            .sendWelcomeEmail(
                mockBody.recipients,
                mockBody.sender,
                mockBody.subject,
                mockBody.header,
                mockBody.subHeader,
                mockBody.body,
                mockBody.imageUrl,
                mockBody.button,
                mockBody.buttonUrl
            )
            .subscribe(emailResponse => {
                expect(emailResponse.status).toEqual(202);
                expect(emailResponse.statusText).toEqual('Accepted');
                expect(emailResponse.data).toEqual({});

                done();
            })
        

    })
});
