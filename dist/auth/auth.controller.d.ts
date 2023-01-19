import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IPositiveRequest } from 'src/core/types/main';
import { TokenType } from 'src/core/types/token.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDTO): Promise<TokenType>;
    create(createUserDto: RegisterUserDto): Promise<IPositiveRequest>;
    getProfile(user: UserEntity): Promise<RegisterUserDto>;
}
