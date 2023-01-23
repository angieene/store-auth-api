import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, name: 'name', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(400)
  name: string;

  @ApiProperty({ type: Number, name: 'stock', required: true, default: 1 })
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  stock: number;

  @ApiProperty({ type: Number, name: 'price', required: true, default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({ type: String, name: 'description', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(400)
  description: string;
}
