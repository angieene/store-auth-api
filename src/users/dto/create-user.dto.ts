import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/core/enums/userRoles.enum';

export class CreateUserDto {
  @ApiProperty({ type: String, name: 'firstname', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  firstname: string;

  @ApiProperty({ type: String, name: 'lastname', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  lastname: string;

  @ApiProperty({ type: String, name: 'email', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, name: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(4000)
  password: string;

  @ApiPropertyOptional({
    enumName: 'RolesEnum',
    enum: Role,
    name: 'role',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role[];
}
