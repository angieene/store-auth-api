"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const validator_1 = require("validator");
let IdValidationPipe = class IdValidationPipe {
    transform(value, metadata) {
        if (metadata.type !== 'param') {
            return value;
        }
        if (!validator_1.default.isUUID(value, 'all')) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
        return value;
    }
};
IdValidationPipe = __decorate([
    (0, common_1.Injectable)()
], IdValidationPipe);
exports.IdValidationPipe = IdValidationPipe;
//# sourceMappingURL=id-validation.pipes.js.map