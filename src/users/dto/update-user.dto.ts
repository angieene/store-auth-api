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
  @ApiPropertyOptional({ type: String, name: 'Firstname' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  firstname?: string;

  @ApiPropertyOptional({ type: String, name: 'Lastname' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  lastname?: string;

  @ApiPropertyOptional({ type: String, name: 'Email' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ type: String, name: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(4000)
  @IsOptional()
  password?: string;
}
