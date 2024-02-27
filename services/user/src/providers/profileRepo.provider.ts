import { DataSource } from 'typeorm';
import  UserProfile  from '../database/entities/userProfile.entity';

export const ProfileRepoProvider = [
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserProfile),
    inject: ['DATA_SOURCE'],
  },
];