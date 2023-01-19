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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const register_user_dto_1 = require("./dto/register-user.dto");
const user_decorator_1 = require("../users/decorator/user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginUserDto) {
        return await this.authService.login(loginUserDto);
    }
    async create(createUserDto) {
        return this.authService.create(createUserDto);
    }
    async getProfile(user) {
        return user;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Log in' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Invalid email or password',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: create_auth_dto_1.CreateAuthDto,
    }),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDTO }),
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Register new user' }),
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.RegisterUserDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'success: true',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        description: 'Email is already exist',
    }),
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: register_user_dto_1.RegisterUserDto,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authorization'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map