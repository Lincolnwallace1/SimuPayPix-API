import { ApiProperty } from '@nestjs/swagger';

class IConfirmTransactionDTO {
  @ApiProperty({ example: 'senha123' })
  password: string;
}

export default IConfirmTransactionDTO;
