import { Module } from '@nestjs/common';
import { EmailDigestService } from './email-digest.service';

@Module({
  providers: [EmailDigestService],
})
export class EmailDigestModule {}
