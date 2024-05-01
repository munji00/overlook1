import { DataSource } from 'typeorm';
import UserProfile from '../database/entities/userProfile.entity';
export declare const ProfileRepoProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<UserProfile>;
    inject: string[];
}[];
