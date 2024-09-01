import { Test, TestingModule } from '@nestjs/testing';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { DeleteTransactionService } from '@modules/transaction/useCases';

describe('DeleteTransactionService', () => {
  let service: DeleteTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTransactionService,
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
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteTransactionService>(DeleteTransactionService);
  });

  it('Use Case: Delete Transaction', async () => {
    await service.execute({
      code: '3aca6ed6-e9f0-4bfe-b535-16b79b076176',
    });

    expect(service).toBeDefined();
  });
});
