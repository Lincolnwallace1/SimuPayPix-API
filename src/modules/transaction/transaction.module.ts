import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';

import TransactionController from './transaction.controller';

import Transaction from '@entities/Transaction';

import TransactionRepository from './repository/TransactionRepository';

import {
  CreateTransactionService,
  GetTransactionService,
  UpdateTransactionService,
  DeleteTransactionService,
  ConfirmTransactionService,
  RefuteTransactionService,
  ListTransactionService,
} from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UserModule],
  providers: [
    TransactionRepository,
    CreateTransactionService,
    GetTransactionService,
    UpdateTransactionService,
    DeleteTransactionService,
    ConfirmTransactionService,
    RefuteTransactionService,
    ListTransactionService,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
