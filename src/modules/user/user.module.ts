import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';

import User from '@entities/User';

import UserRepository from './repository/UserRepository';

import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
} from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserService,
    GetUserService,
    UpdateUserService,
  ],
  exports: [UserRepository],
})
export class UserModule {}
