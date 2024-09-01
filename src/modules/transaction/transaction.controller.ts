import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Patch,
  Param,
  Get,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import AuthGuard from '@common/http/middlewares/AuthMiddleware/auth.guard';

import TransactionGuard from './permissions/transaction.guard';

import ValidationError from '@common/erros/ZodError';

import {
  ICreateTransactionDTO,
  IUpdateTransactionDTO,
  IConfirmTransactionDTO,
  IRefuteTransactionDTO,
  IFilterTransactionDTO,
} from './dtos';

import {
  CreateTransactionSchema,
  UpdateTransactionSchema,
  ConfirmTransactionSchema,
  RefuteTransactionSchema,
  ListTransactionSchema,
} from './schemas';

import {
  ICreateTransactionResponse,
  IGetTransactionResponse,
  IListTransactionResponse,
} from './responses';

import {
  CreateTransactionService,
  GetTransactionService,
  UpdateTransactionService,
  DeleteTransactionService,
  ConfirmTransactionService,
  RefuteTransactionService,
  ListTransactionService,
} from './useCases';

@ApiTags('Transactions')
@ApiBearerAuth('Bearer')
@Controller('transaction')
class TransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly getTransactionService: GetTransactionService,
    private readonly updateTransactionService: UpdateTransactionService,
    private readonly deleteTransactionService: DeleteTransactionService,
    private readonly confirmTransactionService: ConfirmTransactionService,
    private readonly refuteTransactionService: RefuteTransactionService,
    private readonly listTransactionService: ListTransactionService,
  ) {}

  @UseGuards(AuthGuard, TransactionGuard)
  @ApiOperation({ summary: 'Create a new transaction' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'Transaction Created',
    type: ICreateTransactionResponse,
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
  @Post('/')
  public async createTransaction(
    @Body() data: ICreateTransactionDTO,
  ): Promise<ICreateTransactionResponse> {
    const dataParsed = await CreateTransactionSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const transaction = await this.createTransactionService.execute({
      data: dataParsed,
    });

    return transaction;
  }

  @UseGuards(AuthGuard, TransactionGuard)
  @ApiOperation({ summary: 'Get a transaction' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Transaction',
    type: IGetTransactionResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Transaction Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get('/:code')
  public async getTransaction(
    @Param('code') code: string,
  ): Promise<IGetTransactionResponse> {
    const transaction = await this.getTransactionService.execute({
      code,
    });

    return transaction;
  }

  @UseGuards(AuthGuard, TransactionGuard)
  @ApiOperation({ summary: 'Update a transaction' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'Transaction Updated',
    status: HttpStatus.NO_CONTENT,
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
    description: 'Transaction Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Patch('/:code')
  public async updateTransaction(
    @Param('code') code: string,
    @Body() data: IUpdateTransactionDTO,
  ): Promise<void> {
    const dataParsed = await UpdateTransactionSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    await this.updateTransactionService.execute({
      code,
      data: dataParsed,
    });
  }

  @UseGuards(AuthGuard, TransactionGuard)
  @ApiOperation({ summary: 'Delete a transaction' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'Transaction Deleted',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Transaction Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Delete('/:code')
  public async deleteTransaction(@Param('code') code: string): Promise<void> {
    await this.deleteTransactionService.execute({
      code,
    });
  }

  @UseGuards(AuthGuard, TransactionGuard)
  @ApiOperation({ summary: 'Confirm a transaction' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'Transaction Confirmed',
    status: HttpStatus.NO_CONTENT,
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
    description: 'Transaction Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Post('/:code/confirm')
  public async confirmTransaction(
    @Param('code') code: string,
    @Body() data: IConfirmTransactionDTO,
    @Req() req: Request,
  ): Promise<void> {
    const dataParsed = await ConfirmTransactionSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    await this.confirmTransactionService.execute({
      user: req['user'],
      code,
      data: dataParsed,
    });
  }

  @UseGuards(AuthGuard, TransactionGuard)
  @ApiOperation({ summary: 'Refute a transaction' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'Transaction Refuted',
    status: HttpStatus.NO_CONTENT,
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
    description: 'Transaction Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Post('/:code/refute')
  public async refuteTransaction(
    @Param('code') code: string,
    @Body() data: IRefuteTransactionDTO,
    @Req() req: Request,
  ): Promise<void> {
    const dataParsed = await RefuteTransactionSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    await this.refuteTransactionService.execute({
      user: req['user'],
      code,
      data: dataParsed,
    });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List transactions' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Transactions',
    type: IListTransactionResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Post('/list')
  public async listTransaction(
    @Body() data: IFilterTransactionDTO,
    @Req() req: Request,
  ): Promise<IListTransactionResponse> {
    const dataParsed = await ListTransactionSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const transactions = await this.listTransactionService.execute({
      user: req['user'],
      data: dataParsed,
    });

    return transactions;
  }
}

export default TransactionController;
