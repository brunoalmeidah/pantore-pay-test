import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? 'env.test.local' : '.env',
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
