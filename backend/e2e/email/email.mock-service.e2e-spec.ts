import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { EmailModule } from '../../src/email/email.module';
import { EmailService } from '../../src/email/email.service';
import { MockEmailService, mockBody } from '../../__mocks__/mock.email.service';


describe('Email API (mock service)', () => {
    let app: INestApplication;

    const emailService = new MockEmailService();

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [EmailModule],
        })
            .overrideProvider(EmailService)
            .useValue(emailService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });


    /** 
     * @name POST email send 
     * @description send an email and expect the service to be called 
     */
    it(`/POST email/send`, (done) => {
        return request(app.getHttpServer())
            .post('/email/send')
            .send(mockBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .expect({
                "status": 202,
                "statusText": "Accepted",
                "data": ""
            })
            .end( (err, res) => {
                if (err) {
                    console.log('💀 💀 '+err.message);
                    return done(err);
                }


                emailService.sendWelcomeEmail(
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
                .subscribe(email => {

                    expect(email.status).toEqual(202);
                    expect(email.statusText).toEqual('Accepted');
                    expect(email.data).toEqual('');
                    expect(email).toEqual({
                        "status": 202,
                        "statusText": "Accepted",
                        "data": ""
                    })

                    done();

                });


                
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
