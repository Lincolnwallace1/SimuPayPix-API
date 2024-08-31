import { Inject, HttpStatus } from '@nestjs/common';
import AppError from '@common/erros/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

import IResponse from '@modules/user/responses/IGetUserResponse';

interface IRequest {
  id: number;
}

class GetUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.get({ id, enabled: true });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }
}

export default GetUserService;
