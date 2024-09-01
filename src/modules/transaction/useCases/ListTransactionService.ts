import { Inject } from '@nestjs/common';
import Z from 'zod';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { ListTransactionSchema } from '@modules/transaction/schemas';

import { IListTransactionResponse } from '@modules/transaction/responses';

interface IRequest {
  user: number;
  data: Z.infer<typeof ListTransactionSchema>;
}

class ListTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  public async execute({
    user,
    data,
  }: IRequest): Promise<IListTransactionResponse> {
    const [transactions, count] = await this.transactionRepository.filter({
      ...data,
      user,
    });

    const response: IListTransactionResponse = {
      metaData: {
        limit: data.limit,
        offset: data.offset,
        total: count,
      },
      records: transactions.map((transaction) => ({
        transaction: {
          id: transaction.id,
          code: transaction.code,
          valueTransaction: Number(transaction.valueTransaction),
          status: transaction.status,
          type: transaction.type,
          schedule: transaction.schedule,
          paying: {
            id: transaction.paying_.id,
            fullName: transaction.paying_.fullName,
            email: transaction.paying_.email,
          },
          receiving: {
            id: transaction.receiving_.id,
            fullName: transaction.receiving_.fullName,
            email: transaction.receiving_.email,
          },
        },
      })),
    } as IListTransactionResponse;

    return response;
  }
}

export default ListTransactionService;
