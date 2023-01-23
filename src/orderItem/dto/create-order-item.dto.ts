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

export class CreateOrderItemDto {
  @ApiProperty({
    type: Number,
    name: 'amount',
    required: true,
    nullable: false,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ type: String, name: 'comments' })
  @IsString()
  @IsOptional()
  @MaxLength(400)
  comments?: string;

  @ApiPropertyOptional({ type: String, name: 'userId' })
  @IsString()
  @IsOptional()
  @IsUUID('all', { message: 'Not valid Id' })
  userId: string;

  @ApiProperty({ type: String, name: 'productId', required: true })
  @IsNotEmpty()
  @IsString()
  @IsUUID('all', { message: 'Not valid Id' })
  productId!: string;
}
