import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from 'src/core/enums/userRoles.enum';

export class GetProfileDto {
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
