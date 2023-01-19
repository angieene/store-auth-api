import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPositiveRequest } from 'src/core/types/main';
import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userEntity
      .createQueryBuilder('users')
      .orderBy('users.id', 'ASC')
      .getMany();
  }

  async findAllPaginate(
    paginateUsersDto: PaginateUsersDto,
  ): Promise<UserEntity[]> {
    const { pageSize, page } = paginateUsersDto;

    return this.userEntity
      .createQueryBuilder('products')
      .orderBy('products.id', 'ASC')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getMany();
  }

  async findOneById(userId: string): Promise<UserEntity> {
    const searchUser = await this.userEntity.findOne({ where: { id: userId } });

    if (!searchUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return searchUser;
  }

  async findOneByEmail(userEmail: string): Promise<UserEntity> {
    const user = this.userEntity.findOne({
      where: { email: userEmail },
      select: {
        password: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async update(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const equalEmail = this.findOneByEmail(user.email);

    if (equalEmail) {
      throw new BadRequestException('Email is already used');
    }

    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();

    await this.userEntity.save(user);

    return user;
  }

  async findByPayload({ email }): Promise<UserEntity> {
    return this.userEntity.findOne({
      where: { email },
    });
  }

  async remove(userId: string): Promise<IPositiveRequest> {
    const deletedUser = await this.userEntity
      .createQueryBuilder('users')
      .delete()
      .from('users')
      .where({ id: userId })
      .execute();

    if (deletedUser.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
    };
  }
}
