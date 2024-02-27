import { DataSource } from 'typeorm';
import User from '../database/entities/user.entity'
import UserProfile from '../database/entities/userProfile.entity'
import UserAssets from '../database/entities/userAssets.entity'
import UserAcivity from '../database/entities/userActivity.entity'
import * as env from 'dotenv';

env.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host:process.env.DB_HOST || 'localhost',
        port:parseInt(process.env.DB_PORT),
        username:process.env.DB_USERNAME || 'root',
        password:process.env.DB_PASSWORD || 'root',
        database:process.env.DB_NAME,
        entities: [
            User, UserProfile, UserAcivity, UserAssets
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];