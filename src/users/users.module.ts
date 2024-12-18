import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { userProviders } from './user.providers';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: 'userRepo', useClass: UserRepository },
    UserRepository,
    UsersService,
    ...userProviders,
  ],
})
export class UsersModule {}
