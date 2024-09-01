import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';
import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { CreateTransactionService } from '@modules/transaction/useCases';

describe('CreateTransactionService', () => {
  let service: CreateTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionService,
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'jondue@gmail.com',
              accountBalance: 1000,
            }),
          },
        },
        {
          provide: TransactionRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              code: '3aca6ed6-e9f0-4bfe-b535-16b79b076176',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CreateTransactionService>(CreateTransactionService);
  });

  it('Use Case: Create Transaction', async () => {
    await service.execute({
      data: {
        paying: 2,
        receiving: 1,
        type: 'PAYMENT',
        valueTransaction: 100,
      },
    });

    expect(service).toBeDefined();
  });
});
