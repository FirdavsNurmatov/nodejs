import { User } from 'src/users/entities/user.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: User,
  },
];
