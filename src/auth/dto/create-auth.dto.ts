import { ApiProperty } from '@nestjs/swagger';
import { IToken } from '../types/token.interface';

export class CreateAuthDto implements IToken {
  @ApiProperty({
    type: String,
    name: 'accessToken',
  })
  accessToken: string;
}
