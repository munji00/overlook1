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
exports.userController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const userProfile_entity_1 = require("../database/entities/userProfile.entity");
let userController = class userController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(response) {
        try {
            const users = await this.userService.fetchAll();
            response.status(200).send({ success: true, data: users });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUser(params, response) {
        const { id } = params;
        try {
            const user = await this.userService.fetchById(+id);
            response.status(200).send({ success: true, data: user });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateProfile(params, body, response) {
        const { id } = params;
        try {
            const profile = await this.userService.updateProfile(+id, body);
            response.status(200).send({ success: true, data: profile });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateProfileImg(file, params, response) {
        const { id } = params;
        try {
            await this.userService.updateProfileImg(+id, file.filename);
            response.status(200).send({ success: true, message: "profile image uploaded successfully" });
        }
        catch (error) {
            console.log(error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBkrdImg(file, params, response) {
        const { id } = params;
        try {
            await this.userService.updateBkgdImg(+id, file.filename);
            response.status(200).send({ success: true, message: "background image uploaded successfully" });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.userController = userController;
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userProfile_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('upload/profile_img/:id'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "updateProfileImg", null);
__decorate([
    (0, common_1.Put)('upload/back_img/:id'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "updateBkrdImg", null);
exports.userController = userController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], userController);
//# sourceMappingURL=user.controller.js.map