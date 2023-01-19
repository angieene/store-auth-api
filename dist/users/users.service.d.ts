import { Repository } from 'typeorm';
import { IPositiveRequest } from 'src/core/types/main';
import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private userEntity;
    constructor(userEntity: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findAllPaginate(paginateUsersDto: PaginateUsersDto): Promise<UserEntity[]>;
    findOneById(userId: string): Promise<UserEntity>;
    findOneByEmail(userEmail: string): Promise<UserEntity>;
    update(user: UserEntity, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    findByPayload({ email }: {
        email: any;
    }): Promise<UserEntity>;
    remove(userId: string): Promise<IPositiveRequest>;
}
