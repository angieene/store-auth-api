import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPositiveRequest } from 'src/core/types/main';
import { ProductRepository } from 'src/products/products.repository';
import { UserEntity } from 'src/users/entities/user.entity';

import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { PaginateOrdersItemDto } from './dto/paginate-orders-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

import { OrderItemEntity } from './entities/orderItem.entity';
import { OrderItemRepository } from './orderItem.repository';

@Injectable()
export class OrderItemService {
  constructor(
    private orderItemRepository: OrderItemRepository,
    private productRepository: ProductRepository,
  ) {}

  async create(
    user: UserEntity,
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<IPositiveRequest> {
    const { amount, productId } = createOrderItemDto;

    const searchProduct = await this.productRepository.findOne(productId);
    const searchOrder = await this.findByProductId(productId);

    if (searchOrder) {
      const newOrderAmount = amount + searchOrder.amount;

      if (newOrderAmount < searchProduct.stock) {
        this.updateAmount(searchOrder.id, newOrderAmount);

        const newProductAmount = searchProduct.stock - amount;
        await this.productRepository.updateStock(productId, newProductAmount);
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

    await this.orderItemRepository.create(createOrderItemDto);
    await this.productRepository.update(productId, searchProduct);

    if (!searchProduct.stock) {
      await this.productRepository.remove(productId);
    }

    return { success: true };
  }

  async findByProductId(productId: string): Promise<OrderItemEntity> {
    return this.orderItemRepository.findByProductId(productId);
  }

  async findOne(orderId: string): Promise<OrderItemEntity> {
    return this.orderItemRepository.findOne(orderId);
  }

  async findAllPaginate(
    paginateOrdersItemDto: PaginateOrdersItemDto,
    userId: string,
  ): Promise<Array<OrderItemEntity>> {
    return this.orderItemRepository.findAllPaginate(
      paginateOrdersItemDto,
      userId,
    );
  }

  async update(
    orderId: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<IPositiveRequest> {
    const searchOrder = await this.findOne(orderId);

    const searchProduct = await this.productRepository.findOne(
      searchOrder.productId,
    );

    if (
      updateOrderItemDto.amount &&
      updateOrderItemDto.amount > searchProduct.stock
    ) {
      throw new HttpException('Product is not enough', HttpStatus.NOT_FOUND);
    }

    await this.orderItemRepository.update(orderId, updateOrderItemDto);

    if (updateOrderItemDto.amount) {
      searchProduct.stock =
        searchProduct.stock + (searchOrder.amount - updateOrderItemDto.amount);

      await this.productRepository.update(searchOrder.productId, searchProduct);
    }
    return {
      success: true,
    };
  }

  async updateAmount(
    orderId: string,
    newAmount: number,
  ): Promise<IPositiveRequest> {
    return this.orderItemRepository.updateAmount(orderId, newAmount);
  }

  async remove(orderId: string): Promise<IPositiveRequest> {
    const searchOrder = await this.findOne(orderId);
    const { productId, amount } = searchOrder;

    await this.orderItemRepository.remove(orderId);

    const searchProduct = await this.productRepository.findOne(productId);
    const newProductAmount = searchProduct.stock + amount;
    this.productRepository.updateStock(productId, newProductAmount);

    return {
      success: true,
    };
  }
}
