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
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const userActivity_entity_1 = require("./userActivity.entity");
const userAssets_entity_1 = require("./userAssets.entity");
const userProfile_entity_1 = require("./userProfile.entity");
let User = class User {
    async hashedPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashedPassword", null);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userProfile_entity_1.default, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userProfile_entity_1.default)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userAssets_entity_1.default, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userAssets_entity_1.default)
], User.prototype, "assets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userActivity_entity_1.default, (userActivity) => userActivity.fri),
    __metadata("design:type", Array)
], User.prototype, "fri", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userActivity_entity_1.default, (userActivity) => userActivity.fra),
    __metadata("design:type", Array)
], User.prototype, "fra", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map