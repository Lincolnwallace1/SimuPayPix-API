import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';

import User from '@entities/User';

import UserRepository from '@modules/user/repository/UserRepository';

import { CreateUserSchema } from '@modules/user/schemas';

interface IRequest {
  data: Z.infer<typeof CreateUserSchema>;
}

class CreateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<User> {
    const userRecord = await this.userRepository.get({
      email: data.email,
      enabled: true,
    });

    if (userRecord) {
      throw new AppError({
        name: 'User Already Exists',
        errorCode: 'user_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const user = await this.userRepository.create({
      email: data.email,
      fullName: data.fullName,
      password: await argon2.hash(data.password),
      accountBalance: data.accountBalance,
    });

    return user;
  }
}

export default CreateUserService;
