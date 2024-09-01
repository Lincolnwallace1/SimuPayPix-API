import { Inject, HttpStatus } from '@nestjs/common';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { IGetTransactionResponse } from '@modules/transaction/responses';

interface IRequest {
  code: string;
}

class GetTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  public async execute({ code }: IRequest): Promise<IGetTransactionResponse> {
    const transaction = await this.transactionRepository.get(
      {
        code,
      },
      ['paying_', 'receiving_'],
    );

    console.log('transaction', transaction);

    if (!transaction) {
      throw new AppError({
        name: 'Transaction Not Found',
        errorCode: 'transaction_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return {
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
      reversalReason: transaction.reversalReason,
      sentAt: transaction.sentAt,
    };
  }
}

export default GetTransactionService;
