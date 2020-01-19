import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';

@Controller('email')
export class EmailController {

    @Post('send')
    @HttpCode(202)
    postSend(@Req() req: Request){

        return {
            success: true,
            req: {
                body: req.body
            }
        }

    }


}
