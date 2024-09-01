import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';

import { UpdateUserService } from '@modules/user/useCases';

describe('UpdateUserService', () => {
  let service: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
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

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('Use Case: Update User', async () => {
    await service.execute({
      user: 1,
      data: {
        fullName: 'Jonh Dueww',
      },
    });

    expect(service).toBeDefined();
  });
});
