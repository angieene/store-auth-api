"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const orderItem_entity_1 = require("./entities/orderItem.entity");
let OrderItemService = class OrderItemService {
    constructor(orderItemEntity, productsService) {
        this.orderItemEntity = orderItemEntity;
        this.productsService = productsService;
    }
    async create(user, createOrderItemDto) {
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
            }
            else {
                throw new common_1.HttpException('Product is not enough', common_1.HttpStatus.NOT_FOUND);
            }
        }
        if (amount > searchProduct.stock) {
            throw new common_1.HttpException('Product is not enough', common_1.HttpStatus.NOT_FOUND);
        }
        searchProduct.stock = searchProduct.stock - amount;
        createOrderItemDto.userId = user.id;
        const newOrderItem = new orderItem_entity_1.OrderItemEntity(createOrderItemDto);
        this.orderItemEntity.save(newOrderItem);
        await this.productsService.update(productId, searchProduct);
        if (!searchProduct.stock) {
            await this.productsService.remove(productId);
        }
        return { success: true };
    }
    async findByProductId(productId) {
        const searchOrder = this.orderItemEntity.findOne({
            where: { productId: productId },
        });
        if (!searchOrder) {
            throw new common_1.HttpException('Order is not exist', common_1.HttpStatus.NOT_FOUND);
        }
        return searchOrder;
    }
    async update(orderId, updateOrderItemDto) {
        const searchOrder = await this.findOne(orderId);
        const searchProduct = await this.productsService.findOne(searchOrder.productId);
        if (updateOrderItemDto.amount &&
            updateOrderItemDto.amount > searchProduct.stock) {
            throw new common_1.HttpException('Product is not enough', common_1.HttpStatus.NOT_FOUND);
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
    async updateAmount(orderId, newAmount) {
        const updateOrder = await this.orderItemEntity
            .createQueryBuilder()
            .update('order_item')
            .set({
            amount: newAmount,
        })
            .where({ id: orderId })
            .execute();
        if (!updateOrder) {
            throw new common_1.HttpException('Order is not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            success: true,
        };
    }
    async remove(orderId) {
        const searchOrder = await this.findOne(orderId);
        const { productId, amount } = searchOrder;
        const deletedOrder = await this.orderItemEntity
            .createQueryBuilder('order_item')
            .delete()
            .from('order_item')
            .where({ id: orderId })
            .execute();
        if (deletedOrder.affected === 0) {
            throw new common_1.HttpException('Order is not exist', common_1.HttpStatus.NOT_FOUND);
        }
        const searchProduct = await this.productsService.findOne(productId);
        const newProductAmount = searchProduct.stock + amount;
        this.productsService.updateStock(productId, newProductAmount);
        return {
            success: true,
        };
    }
    async findOne(orderId) {
        const searchOrder = await this.orderItemEntity.findOne({
            where: { id: orderId },
        });
        if (!searchOrder) {
            throw new common_1.HttpException('Order is not exist', common_1.HttpStatus.NOT_FOUND);
        }
        return searchOrder;
    }
    async findAllPaginate(paginateOrdersItemDto, userId) {
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
};
OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], OrderItemService);
exports.OrderItemService = OrderItemService;
//# sourceMappingURL=orderItem.service.js.map