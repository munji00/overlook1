import { DataSource } from 'typeorm';
import User from '../database/entities/user.entity';
export declare const UserRepoProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
}[];
