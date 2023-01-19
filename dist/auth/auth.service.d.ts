import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { IPositiveRequest } from 'src/core/types/main';
import { TokenType } from 'src/core/types/token.interface';
export declare class AuthService {
    private usersService;
    private jwtService;
    private userEntity;
    constructor(usersService: UsersService, jwtService: JwtService, userEntity: Repository<UserEntity>);
    validateUser(payload: any): Promise<RegisterUserDto>;
    login(loginUserDTO: LoginUserDTO): Promise<TokenType>;
    create(registerUserDto: RegisterUserDto): Promise<IPositiveRequest>;
}
