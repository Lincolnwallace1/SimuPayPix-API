import { ApiProperty } from '@nestjs/swagger';

class IFilterTransactionDTO {
  @ApiProperty({ example: 10, default: 0 })
  offset?: number;

  @ApiProperty({ example: 50, default: 50 })
  limit?: number;

  @ApiProperty({
    example: 'PAYMENT',
    enum: ['PAYMENT', 'RECEIPT'],
    nullable: true,
  })
  type?: 'PAYMENT' | 'RECEIPT';

  @ApiProperty({
    example: 'COMPLETED',
    enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'REVERSED', 'NOT_AUTHORIZED'],
    nullable: true,
  })
  status?:
    | 'PENDING'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'REVERSED'
    | 'NOT_AUTHORIZED';

  user: number;
}

export default IFilterTransactionDTO;
