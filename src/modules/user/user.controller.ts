import { Body, Controller, Post, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

import ValidationError from '@common/erros/ZodError';

import { ICreateUserDTO } from './dtos';

import { CreateUserSchema } from './schemas';

import { ICreateUserResponse, IGetUserResponse } from './responses';

import { CreateUserService, GetUserService } from '@modules/user/useCases';

@ApiTags('Users')
@Controller('users')
class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    description: 'User Created',
    type: ICreateUserResponse,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User already exists',
    status: HttpStatus.CONFLICT,
  })
  @Post('/')
  public async create(
    @Body() data: ICreateUserDTO,
  ): Promise<ICreateUserResponse> {
    const dataParsed = await CreateUserSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const user = await this.createUserService.execute({
      data: dataParsed,
    });

    return {
      id: user.id,
    };
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    description: 'User Found',
    type: IGetUserResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Get('/:user')
  public async get(@Param('user') user: string): Promise<IGetUserResponse> {
    const userRecord = await this.getUserService.execute({ id: Number(user) });

    return instanceToInstance(userRecord);
  }
}

export default UserController;
