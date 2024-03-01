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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, profileRepository, assetsRepository, activityRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.assetsRepository = assetsRepository;
        this.activityRepository = activityRepository;
    }
    async create(userData) {
        const user = this.userRepository.create(userData);
        const profile = this.profileRepository.create({});
        const assets = this.assetsRepository.create({});
        user.profile = profile;
        user.assets = assets;
        return this.userRepository.save(user);
    }
    async fetchAll() {
        return this.userRepository.find();
    }
    async fetchOne(userName) {
        return this.userRepository.findOne({ where: { userName } });
    }
    async fetchById(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['profile', 'assets', 'fri', 'fri.fra.assets', 'fra.fri', 'fra', 'fra.fri.assets']
        });
    }
    async updateProfile(id, userProfile) {
        const profile = await this.profileRepository.findOne({ where: { id } });
        const newProfile = this.profileRepository.merge(profile, userProfile);
        return await this.profileRepository.save(newProfile);
    }
    async updateProfileImg(id, profileImgPath) {
        const assets = await this.assetsRepository.findOne({ where: { id } });
        if (assets.userProfile !== '' && fs.existsSync(`src/uploads/${assets.userProfile}`))
            fs.unlinkSync(`src/uploads/${assets.userProfile}`);
        const newAssets = this.assetsRepository.merge(assets, { userProfile: profileImgPath });
        return await this.assetsRepository.save(newAssets);
    }
    async updateBkgdImg(id, backgroundImgPath) {
        const assets = await this.assetsRepository.findOne({ where: { id } });
        if (assets.userBackground !== '' && fs.existsSync(`src/uploads/${assets.userBackground}`))
            fs.unlinkSync(`src/uploads/${assets.userBackground}`);
        const newAssets = this.assetsRepository.merge(assets, { userBackground: backgroundImgPath });
        return await this.assetsRepository.save(newAssets);
    }
    async createActivity(activity) {
        const newActivity = this.activityRepository.create(activity);
        return await this.activityRepository.save(newActivity);
    }
    async updateActivity(id) {
        const activity = await this.activityRepository.findOne({ where: { id } });
        activity.isAccepted = true;
        return await this.activityRepository.save(activity);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PROFILE_REPOSITORY')),
    __param(2, (0, common_1.Inject)('ASSETS_REPOSITORY')),
    __param(3, (0, common_1.Inject)('ACTIVITY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map