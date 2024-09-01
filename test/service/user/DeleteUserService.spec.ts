import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';

import { DeleteUserService } from '@modules/user/useCases';

describe('DeleteUserService', () => {
  let service: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: UserRepository,
          useValue: {
            update: jest.fn(),
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'jondue@gmail.com',
              accountBalance: 1000,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  it('Use Case: Delete User', async () => {
    await service.execute({
      id: 1,
    });

    expect(service).toBeDefined();
  });
});
