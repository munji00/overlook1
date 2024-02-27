"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepoProvider = void 0;
const userProfile_entity_1 = require("../database/entities/userProfile.entity");
exports.ProfileRepoProvider = [
    {
        provide: 'PROFILE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(userProfile_entity_1.default),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=profileRepo.provider.js.map