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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userEntity) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userEntity = userEntity;
    }
    async validateUser(payload) {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async login(loginUserDTO) {
        const { password: loginPass, email: loginEmail } = loginUserDTO;
        const user = await this.usersService.findOneByEmail(loginEmail);
        if (!user) {
            throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.NOT_FOUND);
        }
        const { id, password, email, role } = user;
        const isPassEquals = await bcrypt.compare(loginPass, password);
        if (!isPassEquals) {
            throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            access_token: this.jwtService.sign({
                id: id,
                email: email,
                role: role,
            }),
        };
    }
    async create(registerUserDto) {
        const user = await this.userEntity.findOne({
            where: { email: registerUserDto.email },
        });
        if (user) {
            throw new common_1.BadRequestException('Email is already exist');
        }
        const newUser = new user_entity_1.UserEntity(registerUserDto);
        await this.userEntity.save(newUser);
        return { success: true };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map