import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateOrderItemDto {
  @ApiPropertyOptional({
    type: Number,
    name: 'amount',
    default: 1,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;

  @ApiPropertyOptional({ type: String, name: 'comments' })
  @IsString()
  @IsOptional()
  @MaxLength(400)
  comments?: string;

  @ApiPropertyOptional({ type: String, name: 'userId' })
  @IsString()
  @IsOptional()
  // @IsUUID('all', { each: true, message: 'Not valid Id' })
  userId?: string;

  @ApiProperty({ type: String, name: 'productId' })
  @IsNotEmpty()
  @IsString()
  //@IsUUID('all', { each: true, message: 'Not valid Id' })
  productId?: string;
  sdas?: string;
}
