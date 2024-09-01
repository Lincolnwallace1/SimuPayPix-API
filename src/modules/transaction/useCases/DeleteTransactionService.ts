import { Inject, HttpStatus } from '@nestjs/common';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

interface IRequest {
  code: string;
  user: number;
}

class DeleteTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  public async execute({ code, user }: IRequest): Promise<void> {
    const transaction = await this.transactionRepository.get({
      code,
      status: 'PENDING',
    });

    if (!transaction) {
      throw new AppError({
        name: 'Transaction Not Found',
        errorCode: 'transaction_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    if (
      (transaction.type === 'RECEIPT' && transaction.receiving !== user) ||
      (transaction.type === 'PAYMENT' && transaction.paying !== user)
    ) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    await this.transactionRepository.update(transaction.id, {
      status: 'CANCELLED',
    });
  }
}

export default DeleteTransactionService;
