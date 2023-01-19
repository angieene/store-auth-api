import { BaseEntity } from 'src/core/entities/base.entity';
import { OrderItemEntity } from 'src/orderItem/entities/orderItem.entity';
export declare class ProductEntity extends BaseEntity {
    constructor(partial: Partial<ProductEntity>);
    name: string;
    stock: number;
    price: number;
    description: string;
    order: OrderItemEntity;
}
