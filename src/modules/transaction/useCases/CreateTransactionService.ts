import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import { v4 as uuidv4 } from 'uuid';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';
import UserRepository from '@modules/user/repository/UserRepository';

import { CreateTransactionSchema } from '@modules/transaction/schemas';

import { ICreateTransactionResponse } from '@modules/transaction/responses';

interface IRequest {
  data: Z.infer<typeof CreateTransactionSchema>;
}

class CreateTransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({
    data,
  }: IRequest): Promise<ICreateTransactionResponse> {
    const userPaying = await this.userRepository.get({
      id: data.paying,
      enabled: true,
    });

    if (!userPaying) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const userReceiving = await this.userRepository.get({
      id: data.receiving,
      enabled: true,
    });

    if (!userReceiving) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const transaction = await this.transactionRepository.create({
      valueTransaction: data.valueTransaction,
      code: uuidv4(),
      paying: userPaying.id,
      receiving: userReceiving.id,
      status: 'PENDING',
      type: data.type,
    });

    return {
      id: transaction.id,
      code: transaction.code,
    };
  }
}

export default CreateTransactionService;
