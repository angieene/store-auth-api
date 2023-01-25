import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from 'src/users/user.repository';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    UsersModule,
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    //   property: 'users',
    //   session: true,
    // }),
    PassportModule.register({}),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
