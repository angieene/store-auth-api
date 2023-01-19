"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let HttpInterceptor = HttpInterceptor_1 = class HttpInterceptor {
    constructor() {
        this.logger = new common_1.Logger(HttpInterceptor_1.name);
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            this.logger.debug(data);
            return data;
        }));
    }
};
HttpInterceptor = HttpInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], HttpInterceptor);
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=http.interceptor.js.map