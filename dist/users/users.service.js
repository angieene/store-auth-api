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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userEntity) {
        this.userEntity = userEntity;
    }
    async findAll() {
        return await this.userEntity
            .createQueryBuilder('users')
            .orderBy('users.id', 'ASC')
            .getMany();
    }
    async findAllPaginate(paginateUsersDto) {
        const { pageSize, page } = paginateUsersDto;
        return this.userEntity
            .createQueryBuilder('products')
            .orderBy('products.id', 'ASC')
            .take(pageSize)
            .skip((page - 1) * pageSize)
            .getMany();
    }
    async findOneById(userId) {
        const searchUser = await this.userEntity.findOne({ where: { id: userId } });
        if (!searchUser) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return searchUser;
    }
    async findOneByEmail(userEmail) {
        const user = this.userEntity.findOne({
            where: { email: userEmail },
            select: {
                password: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async update(user, updateUserDto) {
        const equalEmail = this.findOneByEmail(user.email);
        if (equalEmail) {
            throw new common_1.BadRequestException('Email is already used');
        }
        Object.assign(user, updateUserDto);
        user.updatedAt = new Date();
        await this.userEntity.save(user);
        return user;
    }
    async findByPayload({ email }) {
        return this.userEntity.findOne({
            where: { email },
        });
    }
    async remove(userId) {
        const deletedUser = await this.userEntity
            .createQueryBuilder('users')
            .delete()
            .from('users')
            .where({ id: userId })
            .execute();
        if (deletedUser.affected === 0) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            success: true,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map