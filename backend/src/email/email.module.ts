import { Module, Global, HttpModule } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
