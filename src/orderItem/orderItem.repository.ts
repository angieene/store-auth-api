import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPositiveRequest } from 'src/core/types/main';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { PaginateOrdersItemDto } from './dto/paginate-orders-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemEntity } from './entities/orderItem.entity';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemEntity: Repository<OrderItemEntity>,
  ) {}

  async create(
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<IPositiveRequest> {
    const newOrderItem = new OrderItemEntity(createOrderItemDto);
    this.orderItemEntity.save(newOrderItem);

    return { success: true };
  }

  async findByProductId(productId: string): Promise<OrderItemEntity> {
    const searchOrder = this.orderItemEntity.findOne({
      where: { productId: productId },
    });

    if (!searchOrder) {
      throw new HttpException('Order is not exist', HttpStatus.NOT_FOUND);
    }

    return searchOrder;
  }

  async findOne(orderId: string): Promise<OrderItemEntity> {
    const searchOrder = await this.orderItemEntity.findOne({
      where: { id: orderId },
    });

    if (!searchOrder) {
      throw new HttpException('Order is not exist', HttpStatus.NOT_FOUND);
    }

    return searchOrder;
  }

  async findAllPaginate(
    paginateOrdersItemDto: PaginateOrdersItemDto,
    userId: string,
  ): Promise<Array<OrderItemEntity>> {
    const { pageSize, page } = paginateOrdersItemDto;

    return this.orderItemEntity
      .createQueryBuilder('order_item')
      .orderBy('order_item.id', 'ASC')
      .leftJoinAndSelect('order_item.product', 'product')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .where({ userId: userId })
      .getMany();
  }

  async updateAmount(
    orderId: string,
    newAmount: number,
  ): Promise<IPositiveRequest> {
    const updateOrder = await this.orderItemEntity
      .createQueryBuilder()
      .update('order_item')
      .set({
        amount: newAmount,
      })
      .where({ id: orderId })
      .execute();

    if (!updateOrder) {
      throw new HttpException(
        'Order is not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      success: true,
    };
  }

  async remove(orderId: string): Promise<IPositiveRequest> {
    const deletedOrder = await this.orderItemEntity
      .createQueryBuilder('order_item')
      .delete()
      .from('order_item')
      .where({ id: orderId })
      .execute();

    if (deletedOrder.affected === 0) {
      throw new HttpException('Order is not exist', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
    };
  }

  async update(
    orderId: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<IPositiveRequest> {
    await this.orderItemEntity
      .createQueryBuilder()
      .update('order_item')
      .set({
        amount: updateOrderItemDto.amount,
        comments: updateOrderItemDto.comments,
      })
      .where({ id: orderId })
      .execute();

    return {
      success: true,
    };
  }
}
