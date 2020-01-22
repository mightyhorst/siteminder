import { 
    Controller, 
    Get, 
    HttpException, 
    HttpStatus 
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('healthcheck')
    @Get('health')
    getHealth(): string {
        return this.appService.getHealthCheck();
    }

    @Get('throws')
    getThrowThatSucker() {
        throw new HttpException('Boner squad', HttpStatus.I_AM_A_TEAPOT);
    }
    
}
