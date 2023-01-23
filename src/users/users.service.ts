import { Injectable } from '@nestjs/common';
import { IPositiveRequest } from 'src/core/types/main';

import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findAllPaginate(
    paginateUsersDto: PaginateUsersDto,
  ): Promise<UserEntity[]> {
    return this.userRepository.findAllPaginate(paginateUsersDto);
  }

  async findOneById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOneById(userId);
  }

  async findOneByEmail(userEmail: string): Promise<UserEntity> {
    return this.userRepository.findOneByEmail(userEmail);
  }

  async update(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userRepository.update(user, updateUserDto);
  }

  async findByPayload({ email }): Promise<UserEntity> {
    return this.userRepository.findByPayload(email);
  }

  async remove(userId: string): Promise<IPositiveRequest> {
    return this.userRepository.remove(userId);
  }
}
