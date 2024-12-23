// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { authProviders } from './auth.providers';

// describe('AuthService', () => {
//   let appController: AuthController;

//   beforeEach(async () => {
//     const auth: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [AuthService, ...authProviders],
//     }).compile();

//     authService = auth.get<AuthController>(AuthService);
//   });

//   describe('create user', () => {
//     it('should return Array<User[]>', () => {
//       expect(appController.create());
//     });
//   });
// });

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Roles } from 'src/common/enums/role';

describe('AuthController', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get(AuthService);
  });

  describe('create', () => {
    it('should return an array of user', async () => {
      const result = 'user created!';
      // jest.spyOn(authService, 'create').mockImplementation(() => result);

      expect(
        authService.create({
          name: 'Firdavs',
          username: 'test_user',
          password: 'SDFsfd23@',
          age: 16,
          gender: 'MALE',
          role: Roles.teacher,
        }),
      ).toBe(result);
    });
  });
});
