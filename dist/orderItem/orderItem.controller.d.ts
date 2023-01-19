import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PaginateOrdersItemDto } from './dto/paginate-orders-item.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderItemService } from './orderItem.service';
import { OrderItemEntity } from './entities/orderItem.entity';
import { IPositiveRequest } from 'src/core/types/main';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    create(user: UserEntity, createOrderItemDto: CreateOrderItemDto): Promise<IPositiveRequest>;
    findUserOrders(user: UserEntity, paginateOrdersItemDto: PaginateOrdersItemDto): Promise<Array<OrderItemEntity>>;
    findUsersOrdersAdmin(userId: string, paginateOrdersItemDto: PaginateOrdersItemDto): Promise<Array<OrderItemEntity>>;
    findOne(orderItemId: string): Promise<OrderItemEntity>;
    update(orderItemId: string, updateOrderItemDto: UpdateOrderItemDto): Promise<IPositiveRequest>;
    remove(orderItemId: string): Promise<IPositiveRequest>;
}
