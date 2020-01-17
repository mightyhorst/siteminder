import { Injectable } from '@nestjs/common';

interface IStatus{
    status?: boolean;
    msg?: string;
}

@Injectable()
export class AppService {
    constuctor() {}

    getHealthCheck(): IStatus {
        return {
            status: true,
            msg: 'Hello World!'
        };
    }
}
