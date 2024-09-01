import { Test, TestingModule } from '@nestjs/testing';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { GetTransactionService } from '@modules/transaction/useCases';

describe('GetTransactionService', () => {
  let service: GetTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              code: '3aca6ed6-e9f0-4bfe-b535-16b79b076176',
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
          },
        },
      ],
    }).compile();

    service = module.get<GetTransactionService>(GetTransactionService);
  });

  it('Use Case: Get Transaction', async () => {
    await service.execute({
      code: '3aca6ed6-e9f0-4bfe-b535-16b79b076176',
    });

    expect(service).toBeDefined();
  });
});
