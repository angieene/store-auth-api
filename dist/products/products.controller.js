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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const paginate_products_dto_1 = require("./dto/paginate-products.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const role_decorator_1 = require("../auth/decorator/role.decorator");
const userRoles_enum_1 = require("../core/enums/userRoles.enum");
const product_entity_1 = require("./entities/product.entity");
const id_validation_pipes_1 = require("../pipes/id-validation.pipes");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async findAllPaginate(paginateProductDto) {
        return this.productsService.findAllPaginate(paginateProductDto);
    }
    async findOne(productId) {
        return this.productsService.findOne(productId);
    }
    async update(productId, updateProductDto) {
        return this.productsService.update(productId, updateProductDto);
    }
    async remove(productId) {
        return this.productsService.remove(productId);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create product' }),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDto }),
    (0, role_decorator_1.Roles)(userRoles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: product_entity_1.ProductEntity,
        isArray: true,
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginate_products_dto_1.PaginateProductsDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllPaginate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get one product' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: product_entity_1.ProductEntity,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)(':productId'),
    __param(0, (0, common_1.Param)('productId', id_validation_pipes_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update one product' }),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.UpdateProductDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, role_decorator_1.Roles)(userRoles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete one product' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, role_decorator_1.Roles)(userRoles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':productId'),
    __param(0, (0, common_1.Param)('productId', id_validation_pipes_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map