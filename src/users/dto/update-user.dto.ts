import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String, name: 'firstname', required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  firstname?: string;

  @ApiPropertyOptional({ type: String, name: 'lastname', required: true })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  lastname?: string;

  @ApiPropertyOptional({ type: String, name: 'email', required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ type: String, name: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(4000)
  @IsOptional()
  password?: string;
}
