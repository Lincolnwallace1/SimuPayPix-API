import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';

import { CreateUserService } from '@modules/user/useCases';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('Use Case: Create User', async () => {
    await service.execute({
      data: {
        fullName: 'Jonh Dueww',
        email: 'jonhduewwUser@gmail.com',
        password: 'senha123',
        accountBalance: 1000,
      },
    });

    expect(service).toBeDefined();
  });
});
