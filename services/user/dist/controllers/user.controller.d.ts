import { UserService } from '../services/user.service';
import { Response } from 'express';
import userProfile from '../database/entities/userProfile.entity';
export declare class userController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(response: Response): Promise<void>;
    getUser(params: {
        id: string;
    }, response: Response): Promise<void>;
    updateProfile(params: {
        id: string;
    }, body: userProfile, response: Response): Promise<void>;
    updateProfileImg(file: any, params: {
        id: string;
    }, response: Response): Promise<void>;
    updateBkrdImg(file: any, params: {
        id: string;
    }, response: Response): Promise<void>;
}
