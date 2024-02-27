"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("../controllers/user.controller");
const user_service_1 = require("../services/user.service");
const database_module_1 = require("./database.module");
const userRepo_provider_1 = require("../providers/userRepo.provider");
const profileRepo_provider_1 = require("../providers/profileRepo.provider");
const assetsRepo_provider_1 = require("../providers/assetsRepo.provider");
const multer_middleware_1 = require("../common/middlewares/multer.middleware");
let userModule = class userModule {
    configure(consumer) {
        consumer
            .apply(multer_middleware_1.MulterMiddleware)
            .forRoutes({ path: 'user/upload/profile_img/:id', method: common_1.RequestMethod.PUT }, { path: 'user/upload/back_img/:id', method: common_1.RequestMethod.PUT });
    }
};
exports.userModule = userModule;
exports.userModule = userModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [user_controller_1.userController],
        providers: [
            ...userRepo_provider_1.UserRepoProvider,
            ...profileRepo_provider_1.ProfileRepoProvider,
            ...assetsRepo_provider_1.AssetsRepoProvider,
            user_service_1.UserService
        ],
        exports: [
            ...userRepo_provider_1.UserRepoProvider,
            ...profileRepo_provider_1.ProfileRepoProvider,
            ...assetsRepo_provider_1.AssetsRepoProvider,
            user_service_1.UserService
        ]
    })
], userModule);
//# sourceMappingURL=user.module.js.map