import {Observable, of} from 'rxjs';
import {IEmail, IEmailResponse} from '../src/email/interfaces/index';

export const mockBody = {
    "recipients": [
        {
            "email": "nickymitch@gmail.com",
            "name": "Nick Mitchell"
        }
    ],
    "header": "Header",
    "subHeader": "Sub Header",
    "body": "Hello world ",
    "imageUrl": "https://www.siteminder.com/wp-content/uploads/2020/01/home-page-hotel-tech-awards.png",
    "button": "Click me",
    "buttonUrl": "https://www.siteminder.com/",
    "subject": "Hello, World!",
    "sender": {
        "email": "nickymitch@gmail.com",
        "name": "Nick Mitchell"
    }
}

export const mockEmailResponse:IEmailResponse = {
    "status": 202,
    "statusText": "Accepted",
    "data": ""

}
export class MockEmailService{

    sendWelcomeEmail(
        recipients: IEmail[],
        sender: IEmail,
        subject: string,

        header?: string,
        subHeader?: string,
        body?: string,
        imageUrl?: string,
        button?: string,
        buttonUrl?: string,
    ): Observable<IEmailResponse>
    {
        return of(mockEmailResponse);
    }

}