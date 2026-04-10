import { AuditLogController } from './audit-log.controller';

describe('AuditLogController', () => {
  let controller: AuditLogController;

  beforeEach(() => {
    controller = new AuditLogController();
  });

  it('should return an empty but successful payload', () => {
    const result = controller.getAuditLogs();

    expect(result).toEqual({
      data: [],
      message: 'No audit logs yet',
      success: true,
    });
  });
});
