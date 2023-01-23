import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'src/auth/decorator/role.decorator';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/core/enums/userRoles.enum';
import { IPositiveRequest } from 'src/core/types/main';
import { IdValidationPipe } from 'src/pipes/id-validation.pipes';
import { User } from './decorator/user.decorator';
import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get users for admin panel' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
    isArray: true,
  })
  @Roles(Role.Admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Get('admin')
  async findAllPaginate(
    @Query() paginateUsersDto: PaginateUsersDto,
  ): Promise<Array<UserEntity>> {
    return this.usersService.findAllPaginate(paginateUsersDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Get(':userId')
  async findOne(
    @Param('userId', IdValidationPipe) userId: string,
  ): Promise<UserEntity> {
    return this.usersService.findOneById(userId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @UseGuards(JWTAuthGuard)
  @Patch()
  async update(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(user, updateUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Roles(Role.Admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Delete(':userId')
  async remove(
    @Param('userId', IdValidationPipe) userId: string,
  ): Promise<IPositiveRequest> {
    return this.usersService.remove(userId);
  }
}
