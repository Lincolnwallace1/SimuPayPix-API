import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

import { UpdateTransactionSchema } from '@modules/transaction/schemas';

interface IRequest {
  code: string;
  data: Z.infer<typeof UpdateTransactionSchema>;
}

class UpdateTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  public async execute({ code, data }: IRequest): Promise<void> {
    const transaction = await this.transactionRepository.get({
      code,
    });

    if (!transaction) {
      throw new AppError({
        name: 'Transaction Not Found',
        errorCode: 'transaction_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    await this.transactionRepository.update(transaction.id, {
      ...data,
    });
  }
}

export default UpdateTransactionService;
