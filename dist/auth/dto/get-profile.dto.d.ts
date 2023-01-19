import { Role } from 'src/core/enums/userRoles.enum';
export declare class GetProfileDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly role: Role[];
}
