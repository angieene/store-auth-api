import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class OrderItemEntity extends BaseEntity {
    constructor(partial: Partial<OrderItemEntity>);
    amount: number;
    comments: string;
    userId: string;
    productId: string;
    product: ProductEntity;
    user: UserEntity;
}
