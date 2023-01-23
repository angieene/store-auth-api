import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { IPositiveRequest } from 'src/core/types/main';
import { TokenType } from 'src/core/types/token.interface';
import { User } from 'src/users/decorator/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid email or password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateAuthDto,
  })
  @ApiBody({ type: LoginUserDTO })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO): Promise<TokenType> {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success: true',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Email is already exist',
  })
  @Post('register')
  async create(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<IPositiveRequest> {
    return this.authService.create(createUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RegisterUserDto,
  })
  @UseGuards(JWTAuthGuard)
  @Get('profile')
  async getProfile(@User() user: UserEntity): Promise<RegisterUserDto> {
    return user;
  }
}
