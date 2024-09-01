import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Transaction from '@entities/Transaction';

import {
  ICreateTransactionDTO,
  IUpdateTransactionDTO,
  IFilterTransactionDTO,
} from '@modules/transaction/dtos';

@Injectable()
class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    return await this.transactionRepository.save({ ...data });
  }

  public async update(id: number, data: IUpdateTransactionDTO): Promise<void> {
    await this.transactionRepository.update(id, {
      ...data,
    });
  }

  public async get(
    where: object | object[],
    relations?: string[],
  ): Promise<Transaction> {
    return await this.transactionRepository.findOne({
      where,
      relations,
    });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[Transaction[], number]> {
    return this.transactionRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }

  public async filter(
    data: IFilterTransactionDTO,
  ): Promise<[Transaction[], number]> {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.paying_', 'userPaying')
      .leftJoinAndSelect('transaction.receiving_', 'userReceiving')
      .where('(transaction.paying = :user OR  transaction.receiving = :user)', {
        user: data.user,
      })

      .take(data.limit ?? 0)
      .skip(data.offset ?? 0);

    if (data.status) {
      query.andWhere('transaction.status = :status', { status: data.status });
    }

    if (data.type) {
      query.andWhere('transaction.type = :type', { type: data.type });
    }

    return query.getManyAndCount();
  }
}

export default TransactionRepository;
