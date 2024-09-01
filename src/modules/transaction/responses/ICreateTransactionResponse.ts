import { ApiProperty } from '@nestjs/swagger';

class ICreateTransactionResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: 'string', format: 'uuid' })
  code: string;
}

export default ICreateTransactionResponse;
