import { DataSource } from 'typeorm';
import UserAssets from '../database/entities/userAssets.entity';
export declare const AssetsRepoProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<UserAssets>;
    inject: string[];
}[];
