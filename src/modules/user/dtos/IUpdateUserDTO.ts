import { ApiProperty } from '@nestjs/swagger';
class IUpdateUserDTO {
  @ApiProperty({ example: 'jondue@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'Jon Due' })
  fullName?: string;

  @ApiProperty({ example: 'senha123' })
  password?: string;

  @ApiProperty({ example: 1000 })
  accountBalance?: number;

  enabled?: boolean;
}

export default IUpdateUserDTO;
