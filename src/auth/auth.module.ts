import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.providers';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'authRepo', useClass: AuthRepository },
    AuthRepository,
    AuthService,
    ...authProviders,
  ],
})
export class AuthModule {}
