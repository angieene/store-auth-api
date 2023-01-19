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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemEntity = void 0;
const base_entity_1 = require("../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../products/entities/product.entity");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
let OrderItemEntity = class OrderItemEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', length: '400', nullable: true }),
    __metadata("design:type", String)
], OrderItemEntity.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrderItemEntity.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrderItemEntity.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => product_entity_1.ProductEntity, required: false }),
    (0, typeorm_1.OneToOne)(() => product_entity_1.ProductEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entity_1.ProductEntity)
], OrderItemEntity.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.UserEntity, required: false }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.orderItems, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderItemEntity.prototype, "user", void 0);
OrderItemEntity = __decorate([
    (0, typeorm_1.Entity)('order_item'),
    __metadata("design:paramtypes", [Object])
], OrderItemEntity);
exports.OrderItemEntity = OrderItemEntity;
//# sourceMappingURL=orderItem.entity.js.map