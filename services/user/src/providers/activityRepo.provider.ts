import { DataSource } from 'typeorm';
import  UserActivity  from '../database/entities/userActivity.entity';

export const ActivityRepoProvider = [
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserActivity),
    inject: ['DATA_SOURCE'],
  },
];