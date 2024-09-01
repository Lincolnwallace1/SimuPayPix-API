import { Inject, HttpStatus } from '@nestjs/common';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

interface IRequest {
  code: string;
}

class DeleteTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  public async execute({ code }: IRequest): Promise<void> {
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

    await this.transactionRepository.update(transaction.id, {
      status: 'CANCELLED',
    });
  }
}

export default DeleteTransactionService;
