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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productEntity) {
        this.productEntity = productEntity;
    }
    async create(createProductDto) {
        const newProduct = new product_entity_1.ProductEntity(createProductDto);
        const response = await this.productEntity.save(newProduct);
        if (!response) {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { success: true };
    }
    async findAllPaginate(paginateProductsDto) {
        const { pageSize, page } = paginateProductsDto;
        return this.productEntity
            .createQueryBuilder('products')
            .orderBy('products.id', 'ASC')
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .getMany();
    }
    async findOne(productId) {
        const searchProduct = await this.productEntity.findOne({
            where: { id: productId },
        });
        if (!searchProduct) {
            throw new common_1.HttpException('Product is not exist', common_1.HttpStatus.NOT_FOUND);
        }
        return searchProduct;
    }
    async update(productId, updateProductDto) {
        const searchProduct = await this.findOne(productId);
        if (!searchProduct) {
            throw new common_1.BadRequestException('Product is not exist');
        }
        searchProduct.createdAt = new Date();
        Object.assign(searchProduct, updateProductDto);
        await this.productEntity.save(searchProduct);
        return { success: true };
    }
    async updateStock(productId, newStock) {
        const searchProduct = await this.productEntity
            .createQueryBuilder()
            .update('products')
            .set({ stock: newStock })
            .where({ id: productId })
            .execute();
        if (!searchProduct) {
            throw new common_1.HttpException('Product is not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            success: true,
        };
    }
    async remove(productId) {
        const deletedProduct = await this.productEntity
            .createQueryBuilder('products')
            .delete()
            .from('products')
            .where({ id: productId })
            .execute();
        if (deletedProduct.affected === 0) {
            throw new common_1.HttpException('Product is not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            success: true,
        };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map