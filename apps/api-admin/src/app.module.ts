import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserManagementModule } from './user-management/user-management.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import {
  DatabaseModule,
  HealthModule,
  LoggingMiddleware,
} from '@my-org/be-shared';

@Module({
  imports: [DatabaseModule, HealthModule, UserManagementModule, AuditLogModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
