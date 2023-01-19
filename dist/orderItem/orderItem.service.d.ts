import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { PaginateOrdersItemDto } from './dto/paginate-orders-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { IPositiveRequest } from 'src/core/types/main';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderItemEntity } from './entities/orderItem.entity';
export declare class OrderItemService {
    private orderItemEntity;
    private readonly productsService;
    constructor(orderItemEntity: Repository<OrderItemEntity>, productsService: ProductsService);
    create(user: UserEntity, createOrderItemDto: CreateOrderItemDto): Promise<IPositiveRequest>;
    findByProductId(productId: string): Promise<OrderItemEntity>;
    update(orderId: string, updateOrderItemDto: UpdateOrderItemDto): Promise<IPositiveRequest>;
    updateAmount(orderId: string, newAmount: number): Promise<IPositiveRequest>;
    remove(orderId: string): Promise<IPositiveRequest>;
    findOne(orderId: string): Promise<OrderItemEntity>;
    findAllPaginate(paginateOrdersItemDto: PaginateOrdersItemDto, userId: string): Promise<Array<OrderItemEntity>>;
}
