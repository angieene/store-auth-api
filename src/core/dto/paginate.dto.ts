import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PaginateDto {
  @ApiProperty({ type: Number, name: 'pageSize', default: 10, required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  @Max(1000000000)
  pageSize: number;

  @ApiProperty({ type: Number, name: 'page', default: 1, required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(1000000000)
  page: number;
}
