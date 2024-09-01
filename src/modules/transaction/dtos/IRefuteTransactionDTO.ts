import { ApiProperty } from '@nestjs/swagger';

class IConfirmTransactionDTO {
  @ApiProperty({ example: 'senha123' })
  password: string;

  @ApiProperty({ example: 'Enviado para pessoa errada' })
  reversalReason: string;
}

export default IConfirmTransactionDTO;
