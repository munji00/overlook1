"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsRepoProvider = void 0;
const userAssets_entity_1 = require("../database/entities/userAssets.entity");
exports.AssetsRepoProvider = [
    {
        provide: 'ASSETS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(userAssets_entity_1.default),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=assetsRepo.provider.js.map