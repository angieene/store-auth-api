"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_module_1 = require("../products/products.module");
const orderItem_entity_1 = require("./entities/orderItem.entity");
const orderItem_controller_1 = require("./orderItem.controller");
const orderItem_service_1 = require("./orderItem.service");
let OrderItemModule = class OrderItemModule {
};
OrderItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orderItem_entity_1.OrderItemEntity]), products_module_1.ProductsModule],
        controllers: [orderItem_controller_1.OrderItemController],
        providers: [orderItem_service_1.OrderItemService],
        exports: [orderItem_service_1.OrderItemService],
    })
], OrderItemModule);
exports.OrderItemModule = OrderItemModule;
//# sourceMappingURL=orderItem.module.js.map