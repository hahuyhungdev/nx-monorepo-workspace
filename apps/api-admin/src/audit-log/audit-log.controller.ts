import { Controller, Get } from '@nestjs/common';

@Controller('audit-log')
export class AuditLogController {
  @Get()
  getAuditLogs() {
    return {
      data: [],
      message: 'No audit logs yet',
      success: true,
    };
  }
}
