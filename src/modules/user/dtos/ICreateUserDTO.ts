import { ApiProperty } from '@nestjs/swagger';

class ICreateUserDTO {
  @ApiProperty({ example: 'jondue@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Jon Due' })
  fullName: string;

  @ApiProperty({ example: 'senha123' })
  password: string;

  @ApiProperty({ example: 1000 })
  accountBalance: number;
}

export default ICreateUserDTO;
