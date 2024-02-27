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
exports.ExistenceCheckInterceptor = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../services/user.service");
let ExistenceCheckInterceptor = class ExistenceCheckInterceptor {
    constructor(userService) {
        this.userService = userService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { userName } = request.body;
        const userExists = await this.userService.fetchOne(userName);
        if (userExists) {
            if (request.url.includes('signin')) {
                request.body.userData = userExists;
                return next.handle();
            }
            else {
                throw new common_1.HttpException('user already exist', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            if (request.url.includes('signup')) {
                return next.handle();
            }
            else {
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
};
exports.ExistenceCheckInterceptor = ExistenceCheckInterceptor;
exports.ExistenceCheckInterceptor = ExistenceCheckInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ExistenceCheckInterceptor);
//# sourceMappingURL=isUserExist.js.map