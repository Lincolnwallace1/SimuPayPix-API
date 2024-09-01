import { ApiProperty } from '@nestjs/swagger';

class MetaData {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

class IUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;
}

class TransactionResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: 'string', format: 'uuid' })
  code: string;

  @ApiProperty({ type: 'number' })
  valueTransaction: number;

  @ApiProperty({
    type: 'string',
    enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'REVERSED', 'NOT_AUTHORIZED'],
  })
  status: string;

  @ApiProperty({
    type: 'string',
    enum: ['PAYMENT', 'RECEIPT'],
  })
  type: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  schedule: Date;

  @ApiProperty({ type: IUser })
  paying: IUser;

  @ApiProperty({ type: IUser })
  receiving: IUser;

  @ApiProperty({ type: 'string' })
  reversalReason: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  sentAt: Date;
}

class Records {
  @ApiProperty({ type: [TransactionResponse] })
  transaction: TransactionResponse;
}

class IListTransactionResponse {
  @ApiProperty({ type: MetaData })
  metaData: MetaData;

  @ApiProperty({ type: Records })
  records: Records[];
}

export default IListTransactionResponse;
