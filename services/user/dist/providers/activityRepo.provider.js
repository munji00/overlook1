"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRepoProvider = void 0;
const userActivity_entity_1 = require("../database/entities/userActivity.entity");
exports.ActivityRepoProvider = [
    {
        provide: 'ACTIVITY_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(userActivity_entity_1.default),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=activityRepo.provider.js.map