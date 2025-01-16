import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';

@Module({
  imports: [
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
  ],
})
export class AuthModule {}
