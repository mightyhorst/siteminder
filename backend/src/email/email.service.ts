import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { tap, map, catchError } from 'rxjs/operators';

import {
    IEmail,
    TDynamicTemplateData,
    IEmailResponse
} from './interfaces/email.interface';
import { Observable } from 'rxjs';

@Injectable()
export class EmailService {

    private sendgridUrl: string;
    private sendgridTemplateId: string;
    private sendgridSecret: string;
    private axiosConfig: AxiosRequestConfig;

    /**
     * Creates an instance of EmailService and injects the HttpService from the HTttpModule 
     * @param {HttpService} http
     * @memberof EmailService
     */
    constructor(private http: HttpService) {
        this.sendgridUrl = 'https://api.sendgrid.com/v3/mail/send';
        this.sendgridTemplateId = 'd-b3273366131c4c19bdd17ab050578960';
        this.sendgridSecret = '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';
        this.axiosConfig = {
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + this.sendgridSecret
            }
        }
    }

    sendEmail(
        recipients: IEmail[],
        sender: IEmail,
        subject: string,
        sendgridTemplateId: string,
        dynamicTemplateData: TDynamicTemplateData
    ): Observable<AxiosResponse<any>> {

        const postData = {
            personalizations: [
                {
                    to: recipients,
                    dynamic_template_data: dynamicTemplateData,
                    subject: subject
                }
            ],
            from: sender,
            reply_to: sender,
            template_id: sendgridTemplateId
        }

        return this.http.post(this.sendgridUrl, postData, this.axiosConfig);
    }

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
    ): Observable<IEmailResponse> {
        return this.sendEmail(
            recipients,
            sender,
            subject,
            this.sendgridTemplateId,
            {
                header,
                subHeader,
                body,
                imageUrl,
                button,
                buttonUrl
            }
        ).pipe(
            tap((response:AxiosResponse) => {
                const { 
                    data,
                    status,
                    statusText,
                    headers,
                    config
                } = response;
                console.log({
                    data,
                    status,
                    statusText,
                    headers,
                    config,
                })
            }),
            map((response:AxiosResponse) => <IEmailResponse>{
                status: response.status,
                statusText: response.statusText,
                data: response.data 
            }), 
            catchError(e => {
                throw new HttpException(e.response.data, e.response.status);
            }),
        );
    }

}
