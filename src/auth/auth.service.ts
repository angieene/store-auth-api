import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { IPositiveRequest } from 'src/core/types/main';
import * as bcrypt from 'bcrypt';
import { TokenType } from 'src/core/types/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async validateUser(payload: any): Promise<RegisterUserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginUserDTO: LoginUserDTO): Promise<TokenType> {
    const { password: loginPass, email: loginEmail } = loginUserDTO;
    const user = await this.usersService.findOneByEmail(loginEmail);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const { id, password, email, role } = user;

    const isPassEquals = await bcrypt.compare(loginPass, password);

    if (!isPassEquals) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      access_token: this.jwtService.sign({
        id: id,
        email: email,
        role: role,
      }),
    };
  }

  async create(registerUserDto: RegisterUserDto): Promise<IPositiveRequest> {
    const user = await this.userEntity.findOne({
      where: { email: registerUserDto.email },
    });

    if (user) {
      throw new BadRequestException('Email is already exist');
    }

    const newUser = new UserEntity(registerUserDto);

    await this.userEntity.save(newUser);

    return { success: true };
  }
}
