import { Inject, HttpStatus } from '@nestjs/common';
import AppError from '@common/erros/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

interface IRequest {
  id: number;
}

class DeleteUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.userRepository.get({ id, enabled: true });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    await this.userRepository.update(user.id, { enabled: false });
  }
}

export default DeleteUserService;
