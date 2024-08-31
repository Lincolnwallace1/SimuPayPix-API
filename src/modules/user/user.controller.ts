import { Body, Controller, Post, HttpStatus } from '@nestjs/common';

import ValidationError from '@common/erros/ZodError';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ICreateUserDTO } from './dtos';

import { CreateUserSchema } from './schemas';

import { ICreateUserResponse } from './responses';

import { CreateUserService } from '@modules/user/useCases';

@ApiTags('Users')
@Controller('users')
class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

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
}

export default UserController;
