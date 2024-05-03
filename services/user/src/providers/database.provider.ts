import { DataSource } from 'typeorm';
import User from '../database/entities/user.entity'
import UserProfile from '../database/entities/userProfile.entity'
import UserAssets from '../database/entities/userAssets.entity'
import UserAcivity from '../database/entities/userActivity.entity'
import * as constants from '../common/constants'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host:constants.DATABASE_HOST || 'localhost',
        port:parseInt(constants.DATABASE_PORT),
        username:constants.DATABASE_USERNAME || 'root',
        password:constants.DATABASE_PASSWORD || 'root',
        database:constants.DATABASE_NAME,
        entities: [
            User, UserProfile, UserAcivity, UserAssets
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];