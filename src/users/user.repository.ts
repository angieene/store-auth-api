import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { IPositiveRequest } from 'src/core/types/main';
import { Repository } from 'typeorm';
import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

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

  async findAll(): Promise<UserEntity[]> {
    return this.userEntity
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
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
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

  async findByPayload(email): Promise<UserEntity> {
    const searchUser = await this.userEntity.findOne({
      where: { email },
    });

    if (!searchUser) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return searchUser;
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

  async updateUserFirstname(userId: string) {
    await this.userEntity
      .createQueryBuilder()
      .update('users')
      .set({ firstname: 'middleware' })
      .where({ id: userId })
      .execute();

    return { succes: true };
  }
}
