import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UserEntity } from './entities/user.entity';
import { IPositiveRequest } from 'src/core/types/main';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllPaginate(paginateUsersDto: PaginateUsersDto): Promise<Array<UserEntity>>;
    findOne(userId: string): Promise<UserEntity>;
    update(user: UserEntity, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(userId: string): Promise<IPositiveRequest>;
}
