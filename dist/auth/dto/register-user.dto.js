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
exports.RegisterUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const userRoles_enum_1 = require("../../core/enums/userRoles.enum");
class RegisterUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'firstname', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'lastname', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'email', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'password', required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(4000),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enumName: 'RolesEnum',
        enum: userRoles_enum_1.Role,
        name: 'role',
        required: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(userRoles_enum_1.Role),
    __metadata("design:type", Array)
], RegisterUserDto.prototype, "role", void 0);
exports.RegisterUserDto = RegisterUserDto;
//# sourceMappingURL=register-user.dto.js.map