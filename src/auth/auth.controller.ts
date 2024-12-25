import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('greet')
  greet() {
    return 'Hello world!';
  }

  @Post('signup')
  register(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.create(signUpAuthDto);
  }

  @Post('signin')
  login(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.login(signInAuthDto);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
