import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
