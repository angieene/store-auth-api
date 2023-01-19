import { BaseEntity } from 'src/core/entities/base.entity';
import { Role } from 'src/core/enums/userRoles.enum';
import { OrderItemEntity } from 'src/orderItem/entities/orderItem.entity';
export declare class UserEntity extends BaseEntity {
    constructor(partial: Partial<UserEntity>);
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role[];
    orderItems: OrderItemEntity[];
    hashPassword(): Promise<void>;
}
