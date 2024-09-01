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

  paying?: number;

  receiving?: number;

  reversalReason?: string;

  sentAt?: Date;
}

export default IUpdateTransactionDTO;
