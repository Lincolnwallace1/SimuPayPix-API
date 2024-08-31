import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import ValidationError from '@common/erros/ZodError';

import { ILoginDTO } from './dtos';

import { LoginSchema } from './schemas';

import { ILoginResponse } from './responses';

import { LoginService } from './useCases';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'User Logged',
    type: ILoginResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Post('/')
  public async login(@Body() data: ILoginDTO): Promise<ILoginResponse> {
    const dataParsed = await LoginSchema.parseAsync(data).catch((error) => {
      throw new ValidationError(error);
    });

    const login = await this.loginService.execute({ data: dataParsed });

    return login;
  }
}

export default AuthController;
