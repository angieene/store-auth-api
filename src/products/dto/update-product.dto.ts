import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ type: String, name: 'name' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(400)
  name: string;

  @ApiPropertyOptional({ type: Number, name: 'stock', default: 1 })
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({ type: Number, name: 'price', default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Min(1)
  price: number;

  @ApiPropertyOptional({ type: String, name: 'description' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(400)
  description: string;
}
