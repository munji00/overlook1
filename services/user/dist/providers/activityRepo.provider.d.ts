import { DataSource } from 'typeorm';
import UserActivity from '../database/entities/userActivity.entity';
export declare const ActivityRepoProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<UserActivity>;
    inject: string[];
}[];
