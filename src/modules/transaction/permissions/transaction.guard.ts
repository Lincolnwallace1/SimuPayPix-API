import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import AppError from '@common/erros/AppError';

import TransactionRepository from '@modules/transaction/repository/TransactionRepository';

@Injectable()
class TransactionGuard implements CanActivate {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    const transaction = request.params.code
      ? await this.transactionRepository.get({ code: request.params.code })
      : null;

    if (!user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (
      request.body.paying !== undefined &&
      user !== request.body.paying &&
      user !== request.body.receiving
    ) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (
      transaction &&
      transaction.paying !== user &&
      transaction.receiving !== user
    ) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }
}

export default TransactionGuard;
