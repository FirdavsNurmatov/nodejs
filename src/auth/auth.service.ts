import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('authRepo') private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    const { dataValues } = await this.authRepository.signUp(signUpAuthDto);
    delete dataValues.password;

    return dataValues;
  }

  async login(signInAuthDto: SignInAuthDto) {
    const { username, password } = signInAuthDto;
    const data = await this.authRepository.signIn(username, password);

    if (!data || data.length < 1) throw new NotFoundException();

    delete data[0].password;

    const payload = {
      sub: data[0].username,
      role: data[0].role,
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return this.authRepository.findOne(id);
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return this.authRepository.update(id, updateAuthDto);
  // }

  // remove(id: number) {
  //   return this.authRepository.remove(id);
  // }
}
