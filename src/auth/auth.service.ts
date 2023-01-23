import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IPositiveRequest } from 'src/core/types/main';
import { TokenType } from 'src/core/types/token.interface';
import { UserRepository } from 'src/users/user.repository';

import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(payload: any): Promise<RegisterUserDto> {
    return this.userRepository.findByPayload(payload);
  }

  async login(loginUserDTO: LoginUserDTO): Promise<TokenType> {
    const { password: loginPass, email: loginEmail } = loginUserDTO;
    const user = await this.userRepository.findOneByEmail(loginEmail);

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
    return this.userRepository.create(registerUserDto);
  }
}
