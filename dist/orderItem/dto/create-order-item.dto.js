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
exports.CreateOrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderItemDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
        required: true,
        nullable: false,
        default: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, name: 'comments' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(400),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, name: 'userId' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('all', { each: true, message: 'Not valid Id' }),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'productId', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('all', { each: true, message: 'Not valid Id' }),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "productId", void 0);
exports.CreateOrderItemDto = CreateOrderItemDto;
//# sourceMappingURL=create-order-item.dto.js.map