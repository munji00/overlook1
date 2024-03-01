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
exports.authController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_service_1 = require("../services/user.service");
const user_entity_1 = require("../database/entities/user.entity");
const isUserExist_1 = require("../common/interceptors/isUserExist");
const jwt_helper_1 = require("../common/helper/jwt.helper");
let authController = class authController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(user, response) {
        try {
            const userData = await this.userService.create(user);
            response.status(201).send({ success: true, message: "signup successfully", data: userData });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signin(user, response) {
        try {
            const userData = await this.userService.fetchOne(user.userName);
            const isValid = await bcrypt.compare(user.password, userData.password);
            if (!isValid)
                throw new common_1.HttpException('password or username incorrect', common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION);
            const accessToken = await jwt_helper_1.jwtHelper.generateToken({ userName: userData.userName, id: userData.id });
            response.cookie("accessToken", accessToken);
            response.status(200).send({ success: true, message: "signin successfully", data: userData });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.authController = authController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UseInterceptors)(isUserExist_1.ExistenceCheckInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.UseInterceptors)(isUserExist_1.ExistenceCheckInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "signin", null);
exports.authController = authController = __decorate([
    (0, common_1.Controller)('user/auth'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], authController);
//# sourceMappingURL=auth.controller.js.map