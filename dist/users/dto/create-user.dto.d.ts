import { Role } from 'src/core/enums/userRoles.enum';
export declare class CreateUserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role?: Role[];
}
