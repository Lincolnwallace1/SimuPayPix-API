import { ApiProperty } from '@nestjs/swagger';

class ILoginDTO {
  @ApiProperty({ example: 'jondue@gmail.com' })
  email: string;

  @ApiProperty({ example: 'senha123' })
  password: string;
}

export default ILoginDTO;
