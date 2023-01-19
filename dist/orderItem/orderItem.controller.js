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
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_order_item_dto_1 = require("./dto/create-order-item.dto");
const update_order_item_dto_1 = require("./dto/update-order-item.dto");
const paginate_orders_item_dto_1 = require("./dto/paginate-orders-item.dto");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const orderItem_service_1 = require("./orderItem.service");
const orderItem_entity_1 = require("./entities/orderItem.entity");
const user_decorator_1 = require("../users/decorator/user.decorator");
const id_validation_pipes_1 = require("../pipes/id-validation.pipes");
let OrderItemController = class OrderItemController {
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    async create(user, createOrderItemDto) {
        return this.orderItemService.create(user, createOrderItemDto);
    }
    async findUserOrders(user, paginateOrdersItemDto) {
        return this.orderItemService.findAllPaginate(paginateOrdersItemDto, user.id);
    }
    async findUsersOrdersAdmin(userId, paginateOrdersItemDto) {
        return this.orderItemService.findAllPaginate(paginateOrdersItemDto, userId);
    }
    async findOne(orderItemId) {
        return this.orderItemService.findOne(orderItemId);
    }
    async update(orderItemId, updateOrderItemDto) {
        return this.orderItemService.update(orderItemId, updateOrderItemDto);
    }
    async remove(orderItemId) {
        return this.orderItemService.remove(orderItemId);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create order' }),
    (0, swagger_1.ApiBody)({ type: create_order_item_dto_1.CreateOrderItemDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Product is not enough',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        create_order_item_dto_1.CreateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Find user orders' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        paginate_orders_item_dto_1.PaginateOrdersItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findUserOrders", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Find user orders for admin' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Get)('admin/:userId'),
    __param(0, (0, common_1.Param)('userId', id_validation_pipes_1.IdValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, paginate_orders_item_dto_1.PaginateOrdersItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findUsersOrdersAdmin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Find one order' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: orderItem_entity_1.OrderItemEntity,
        isArray: true,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Get)(':orderItemId'),
    __param(0, (0, common_1.Param)('orderItemId', id_validation_pipes_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update one order item' }),
    (0, swagger_1.ApiBody)({ type: update_order_item_dto_1.UpdateOrderItemDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Product is not enough',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Patch)(':orderItemId'),
    __param(0, (0, common_1.Param)('orderItemId', id_validation_pipes_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_item_dto_1.UpdateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete one order item' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Order is not exist',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Delete)(':orderItemId'),
    __param(0, (0, common_1.Param)('orderItemId', id_validation_pipes_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "remove", null);
OrderItemController = __decorate([
    (0, swagger_1.ApiTags)('Order item'),
    (0, common_1.Controller)('orderItem'),
    __metadata("design:paramtypes", [orderItem_service_1.OrderItemService])
], OrderItemController);
exports.OrderItemController = OrderItemController;
//# sourceMappingURL=orderItem.controller.js.map