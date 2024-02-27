import { DataSource } from 'typeorm';
import  UserAssets  from '../database/entities/userAssets.entity';

export const AssetsRepoProvider = [
  {
    provide: 'ASSETS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserAssets),
    inject: ['DATA_SOURCE'],
  },
];