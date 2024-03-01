import { Repository } from 'typeorm';
import User from '../database/entities/user.entity';
import UserProfile from '../database/entities/userProfile.entity';
import UserAssets from '../database/entities/userAssets.entity';
import { Iprofile } from '../interfaces/profile.interface';
import { Iassets } from '../interfaces/assets.interface';
import UserActivity from '../database/entities/userActivity.entity';
import { createActivityI, fetchActivityI } from 'src/interfaces/activity.interface';
export declare class UserService {
    private userRepository;
    private profileRepository;
    private assetsRepository;
    private activityRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<UserProfile>, assetsRepository: Repository<UserAssets>, activityRepository: Repository<UserActivity>);
    create(userData: User): Promise<User>;
    fetchAll(): Promise<User[]>;
    fetchOne(userName: string): Promise<User>;
    fetchById(id: number): Promise<User>;
    updateProfile(id: number, userProfile: Iprofile): Promise<Iprofile>;
    updateProfileImg(id: number, profileImgPath: string): Promise<Iassets>;
    updateBkgdImg(id: number, backgroundImgPath: string): Promise<UserAssets>;
    createActivity(activity: createActivityI): Promise<fetchActivityI>;
    updateActivity(id: number): Promise<fetchActivityI>;
}
