import { ApiProperty } from '@nestjs/swagger';

class ICreateTransactionDTO {
  @ApiProperty({ example: 70.0 })
  valueTransaction: number;

  @ApiProperty({ example: 'PAYMENT', enum: ['PAYMENT', 'RECEIPT'] })
  type: 'PAYMENT' | 'RECEIPT';

  code: string;

  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REVERSED' | 'NOT_AUTHORIZED';

  @ApiProperty({ example: 1 })
  paying: number;

  @ApiProperty({ example: 2 })
  receiving: number;
}

export default ICreateTransactionDTO;
