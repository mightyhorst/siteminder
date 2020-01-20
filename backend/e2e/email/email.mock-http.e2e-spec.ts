import * as supertestRequest from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { EmailModule } from '../../src/email/email.module';
import { EmailService } from '../../src/email/email.service';
import { mockBody } from '../../__mocks__/mock.email.service';

const axiosResponse: AxiosResponse = {
    status: 202,
    statusText: 'Accepted',
    headers: {},
    config: {},
    data: {}
}



describe('Email API (mock http service)', () => {
    let app: INestApplication;
    let httpService: HttpService;
    let mockHttpService = {
        post: jest.fn((
            sendgridUrl, 
            postData, 
            axiosConfig
        )=> of(axiosResponse))
    }

    /**
     * @name beforeAll setup the testing module 
     */
    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [EmailModule, HttpModule]
        })
            .overrideProvider(HttpService)
            .useValue(mockHttpService)
            .compile();

        app = module.createNestApplication();
        httpService = module.get<HttpService>(HttpService);
        await app.init();
    });


    /** 
     * @name POST email send 
     * @description send an email and expect the http service to be called 
     */
    it(`/POST email/send`, async (done) => {
        
        
        /*
        const spy = jest.spyOn(httpService, 'post')
        spy.mockImplementationOnce((
            sendgridUrl, 
            postData, 
            axiosConfig
        )=> of(axiosResponse));
        */

        /**
         * @param {SuperTestRequest} supertestRequest - axios mock for supertest 
         */
        const supertestResponse = await supertestRequest(app.getHttpServer())
            .post('/email/send')
            .send(mockBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .expect({
                "status": 202,
                "statusText": "Accepted",
                "data": {}
            });

        expect(mockHttpService.post).toHaveBeenCalled();

        done();

        return supertestResponse;
    });

    /**
     * @name afterAll close the app 
     */
    afterAll(async () => {
        await app.close();
    });
});
