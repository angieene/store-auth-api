import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Role } from 'src/core/enums/userRoles.enum';
import { IPositiveRequest } from 'src/core/types/main';
import { TokenType } from 'src/core/types/token.interface';
import { UserRepository } from 'src/users/user.repository';

import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IToken } from './types/token.interface';

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
    const user = await this.userRepository.findOnlyPassword(loginEmail);

    const { id, password, email, role } = user;

    const isPassEquals = await bcrypt.compare(loginPass, password);

    if (!isPassEquals) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const tokens = await this.getTokens(id, email, role);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(userId, hashedRefreshToken);
  }

  async logout(userId: string) {
    return this.userRepository.updateRefreshToken(userId, null);
  }

  async create(registerUserDto: RegisterUserDto): Promise<IPositiveRequest> {
    return this.userRepository.create(registerUserDto);
  }

  async getTokens(userId: string, email: string, role: Role[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
          role: role,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '20m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
          role: role,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<IToken> {
    const user = await this.userRepository.findOneById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
  }
}
