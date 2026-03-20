import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env['DB_PATH'] ?? 'data/dev.sqlite',
      entities: [User],
      synchronize: process.env['NODE_ENV'] !== 'production',
      autoLoadEntities: true,
      logging: process.env['NODE_ENV'] === 'development',
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
