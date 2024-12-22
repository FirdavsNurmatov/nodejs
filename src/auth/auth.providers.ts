import { User } from 'src/user/entities/user.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: User,
  },
];
