import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailDigestService {
  async sendDigests() {
    console.log('[EmailDigest] Sending email digests...');
    // TODO: Implement email digest logic
  }
}
