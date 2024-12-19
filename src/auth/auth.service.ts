import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthRepository } from './repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('authRepo') private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return this.authRepository.register(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const data = await this.authRepository.login(email, password);

    console.log(data);
    if (!data) {
      throw new NotFoundException('User not found!');
    }

    const payload = {
      sub: 1,
      name: 'salom',
      role: 'admin',
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
