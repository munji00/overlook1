"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepoProvider = void 0;
const user_entity_1 = require("../database/entities/user.entity");
exports.UserRepoProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_entity_1.default),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=userRepo.provider.js.map