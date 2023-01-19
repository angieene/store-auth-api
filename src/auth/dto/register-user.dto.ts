import { ApiProperty } from '@nestjs/swagger';
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

export class RegisterUserDto {
  @ApiProperty({ type: String, name: 'firstname', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly firstname: string;

  @ApiProperty({ type: String, name: 'lastname', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly lastname: string;

  @ApiProperty({ type: String, name: 'email', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String, name: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(4000)
  readonly password: string;

  @ApiProperty({
    enumName: 'RolesEnum',
    enum: Role,
    name: 'role',
    required: true,
  })
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role[];
}
