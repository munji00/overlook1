import { Repository } from 'typeorm';
import User from '../database/entities/user.entity';
import UserProfile from '../database/entities/userProfile.entity';
import UserAssets from '../database/entities/userAssets.entity';
export declare class UserService {
    private userRepository;
    private profileRepository;
    private assetsRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<UserProfile>, assetsRepository: Repository<UserAssets>);
    create(userData: User): Promise<User>;
    fetchAll(): Promise<User[]>;
    fetchOne(userName: string): Promise<User>;
    fetchById(id: number): Promise<User>;
    updateProfile(id: number, userProfile: UserProfile): Promise<UserProfile>;
    updateProfileImg(id: number, profileImgPath: string): Promise<UserAssets>;
    updateBkgdImg(id: number, backgroundImgPath: string): Promise<UserAssets>;
}
