"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const userProfile_entity_1 = require("../database/entities/userProfile.entity");
const userAssets_entity_1 = require("../database/entities/userAssets.entity");
const userActivity_entity_1 = require("../database/entities/userActivity.entity");
const env = require("dotenv");
env.config();
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || 'root',
                database: process.env.DB_NAME,
                entities: [
                    user_entity_1.default, userProfile_entity_1.default, userActivity_entity_1.default, userAssets_entity_1.default
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.provider.js.map