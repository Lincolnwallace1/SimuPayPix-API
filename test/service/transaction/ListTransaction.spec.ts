import { Test, TestingModule } from '@nestjs/testing';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { ListTransactionService } from '@modules/transaction/useCases';

describe('ListTransactionService', () => {
  let service: ListTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListTransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            filter: jest.fn().mockResolvedValue([
              [
                {
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
                },
              ],
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<ListTransactionService>(ListTransactionService);
  });

  it('Use Case: List Transaction', async () => {
    await service.execute({
      user: 1,
      data: {
        limit: 10,
        offset: 0,
      },
    });

    expect(service).toBeDefined();
  });
});
