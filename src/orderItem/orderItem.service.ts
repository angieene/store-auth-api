import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { PaginateOrdersItemDto } from './dto/paginate-orders-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

import { IPositiveRequest } from 'src/core/types/main';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderItemEntity } from './entities/orderItem.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemEntity: Repository<OrderItemEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    user: UserEntity,
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<IPositiveRequest> {
    let { amount, productId } = createOrderItemDto;

    const searchProduct = await this.productsService.findOne(productId);
    const searchOrder = await this.findByProductId(productId);

    if (searchOrder) {
      const newOrderAmount = amount + searchOrder.amount;

      if (newOrderAmount < searchProduct.stock) {
        this.updateAmount(searchOrder.id, newOrderAmount);

        const newProductAmount = searchProduct.stock - amount;
        await this.productsService.updateStock(productId, newProductAmount);
        return { success: true };
      } else {
        throw new HttpException('Product is not enough', HttpStatus.NOT_FOUND);
      }
    }

    if (amount > searchProduct.stock) {
      throw new HttpException('Product is not enough', HttpStatus.NOT_FOUND);
    }

    searchProduct.stock = searchProduct.stock - amount;
    createOrderItemDto.userId = user.id;

    const newOrderItem = new OrderItemEntity(createOrderItemDto);
    this.orderItemEntity.save(newOrderItem);

    await this.productsService.update(productId, searchProduct);

    if (!searchProduct.stock) {
      await this.productsService.remove(productId);
    }

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

  // async update(
  //   orderId: string,
  //   updateOrderItemDto: UpdateOrderItemDto,
  // ): Promise<IPositiveRequest> {
  //   const searchOrder = await this.findOne(orderId);

  //   const searchProduct = await this.productsService.findOne(
  //     searchOrder.productId,
  //   );

  //   if (!searchProduct || !searchOrder) {
  //     throw new BadRequestException('Order or product is not exist');
  //   }

  //   if (updateOrderItemDto.amount > searchProduct.stock) {
  //     throw new HttpException('Product is not enough', HttpStatus.NOT_FOUND);
  //   }

  //   searchOrder.createdAt = new Date();

  //   Object.assign(searchOrder, updateOrderItemDto);
  //   await this.orderItemEntity.save(searchOrder);

  //   if (updateOrderItemDto.amount) {
  //     searchProduct.stock =
  //       searchProduct.stock + (searchProduct.stock - updateOrderItemDto.amount);

  //     await this.productsService.update(searchOrder.productId, searchProduct);
  //   }
  //   return { success: true };
  // }

  async update(
    orderId: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<IPositiveRequest> {
    const searchOrder = await this.findOne(orderId);

    const searchProduct = await this.productsService.findOne(
      searchOrder.productId,
    );

    if (
      updateOrderItemDto.amount &&
      updateOrderItemDto.amount > searchProduct.stock
    ) {
      throw new HttpException('Product is not enough', HttpStatus.NOT_FOUND);
    }

    await this.orderItemEntity
      .createQueryBuilder()
      .update('order_item')
      .set({
        amount: updateOrderItemDto.amount,
        comments: updateOrderItemDto.comments,
      })
      .where({ id: orderId })
      .execute();

    if (updateOrderItemDto.amount) {
      searchProduct.stock =
        searchProduct.stock + (searchOrder.amount - updateOrderItemDto.amount);

      await this.productsService.update(searchOrder.productId, searchProduct);
    }
    return {
      success: true,
    };
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
    const searchOrder = await this.findOne(orderId);
    const { productId, amount } = searchOrder;

    const deletedOrder = await this.orderItemEntity
      .createQueryBuilder('order_item')
      .delete()
      .from('order_item')
      .where({ id: orderId })
      .execute();

    if (deletedOrder.affected === 0) {
      throw new HttpException('Order is not exist', HttpStatus.NOT_FOUND);
    }

    const searchProduct = await this.productsService.findOne(productId);
    const newProductAmount = searchProduct.stock + amount;
    this.productsService.updateStock(productId, newProductAmount);

    return {
      success: true,
    };
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
}
