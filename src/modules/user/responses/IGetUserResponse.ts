import { ApiProperty } from '@nestjs/swagger';

class IGetUserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  accountBalance: number;
}

export default IGetUserResponse;
