import { EmailDigestService } from './email-digest.service';

describe('EmailDigestService', () => {
  let service: EmailDigestService;

  beforeEach(() => {
    service = new EmailDigestService();
  });

  it('should log digest processing when executed', async () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);

    await service.sendDigests();

    expect(logSpy).toHaveBeenCalledWith(
      '[EmailDigest] Sending email digests...'
    );
    logSpy.mockRestore();
  });
});
