import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';
import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { RefuteTransactionService } from '@modules/transaction/useCases';

describe('RefuteTransactionService', () => {
  let service: RefuteTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefuteTransactionService,
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'jondue@gmail.com',
              accountBalance: 1000,
              password:
                '$argon2id$v=19$m=65536,t=3,p=4$XwwpGYdCMUqRML5C2RRPMw$6kCzoZW2s5vxv53EFjePY7kXBulsgG+aAovW/q+DTxU',
            }),
            update: jest.fn(),
          },
        },
        {
          provide: TransactionRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              code: '3aca6ed6-e9f0-4bfe-b535-16b79b076176',
              status: 'COMPLETED',
              type: 'PAYMENT',
              valueTransaction: 100,
              paying_: {
                id: 1,
                fullname: 'John Doe',
                email: 'jondue@gmail.com',
              },
              receiving_: {
                id: 2,
                fullname: 'Jane Doe',
                email: 'janedoe@gmail.com',
              },
            }),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RefuteTransactionService>(RefuteTransactionService);
  });

  it('Use Case: Refute Transaction', async () => {
    await service.execute({
      user: 1,
      code: '3aca6ed6-e9f0-4bfe-b535-16b79b076176',
      data: {
        password: 'senha123',
      },
    });

    expect(service).toBeDefined();
  });
});
