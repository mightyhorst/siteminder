import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constuctor() {}

    getHealthCheck(): string {
        return 'ok';
    }

}
