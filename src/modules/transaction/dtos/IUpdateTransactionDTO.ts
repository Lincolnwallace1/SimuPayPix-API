import { ApiProperty } from '@nestjs/swagger';

class IUpdateTransactionDTO {
  @ApiProperty({ example: 70.0 })
  valueTransaction?: number;

  type?: 'PAYMENT' | 'RECEIPT';

  status?:
    | 'PENDING'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'REVERSED'
    | 'NOT_AUTHORIZED';

  @ApiProperty({ example: '2024-08-31', nullable: true })
  schedule?: Date | null;

  paying?: number;

  receiving?: number;

  reversalReason?: string;

  sentAt?: Date;
}

export default IUpdateTransactionDTO;
