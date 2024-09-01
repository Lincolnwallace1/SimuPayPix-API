import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';
import UserRepository from '@modules/user/repository/UserRepository';

import { ConfirmTransactionSchema } from '@modules/transaction/schemas';

interface IRequest {
  user: number;
  code: string;
  data: Z.infer<typeof ConfirmTransactionSchema>;
}

class ConfirmTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ user, code, data }: IRequest): Promise<void> {
    const transaction = await this.transactionRepository.get(
      {
        code,
        status: 'PENDING',
      },
      ['paying_', 'receiving_'],
    );

    if (!transaction) {
      throw new AppError({
        name: 'Transaction Not Found',
        errorCode: 'transaction_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const userRecord = await this.userRepository.get({
      id: user,
      enabled: true,
    });

    const passwordMatch = await argon2.verify(
      userRecord.password,
      data.password,
    );

    if (
      !passwordMatch ||
      Number(userRecord.accountBalance) < Number(transaction.valueTransaction)
    ) {
      await this.transactionRepository.update(transaction.id, {
        status: 'NOT_AUTHORIZED',
      });

      return;
    }

    await this.userRepository.update(userRecord.id, {
      accountBalance:
        Number(userRecord.accountBalance) -
        Number(transaction.valueTransaction),
    });

    await this.userRepository.update(transaction.receiving_.id, {
      accountBalance:
        Number(transaction.receiving_.accountBalance) +
        Number(transaction.valueTransaction),
    });

    await this.transactionRepository.update(transaction.id, {
      sentAt: new Date(),
      status: 'COMPLETED',
    });
  }
}

export default ConfirmTransactionService;
