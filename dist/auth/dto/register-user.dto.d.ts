import { Role } from 'src/core/enums/userRoles.enum';
export declare class RegisterUserDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role[];
}
