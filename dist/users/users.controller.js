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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const paginate_user_dto_1 = require("./dto/paginate-user.dto");
const role_decorator_1 = require("../auth/decorator/role.decorator");
const user_decorator_1 = require("./decorator/user.decorator");
const userRoles_enum_1 = require("../core/enums/userRoles.enum");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const user_entity_1 = require("./entities/user.entity");
const id_validation_pipes_1 = require("../pipes/id-validation.pipes");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAllPaginate(paginateUsersDto) {
        return this.usersService.findAllPaginate(paginateUsersDto);
    }
    async findOne(userId) {
        return this.usersService.findOneById(userId);
    }
    async update(user, updateUserDto) {
        return this.usersService.update(user, updateUserDto);
    }
    async remove(userId) {
        return this.usersService.remove(userId);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get users for admin panel' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: user_entity_1.UserEntity,
        isArray: true,
    }),
    (0, role_decorator_1.Roles)(userRoles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginate_user_dto_1.PaginateUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllPaginate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: user_entity_1.UserEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId', id_validation_pipes_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Update user data' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete one user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, role_decorator_1.Roles)(userRoles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId', id_validation_pipes_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map