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
exports.ProductEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../core/entities/base.entity");
const orderItem_entity_1 = require("../../orderItem/entities/orderItem.entity");
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', length: '400', nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, typeorm_1.Column)({ type: 'float', nullable: false, default: 0.0 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', length: '400', nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orderItem_entity_1.OrderItemEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", orderItem_entity_1.OrderItemEntity)
], ProductEntity.prototype, "order", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)('products'),
    __metadata("design:paramtypes", [Object])
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map