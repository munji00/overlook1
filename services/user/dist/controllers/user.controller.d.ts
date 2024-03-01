/// <reference types="multer" />
import { UserService } from '../services/user.service';
import { Response, Request } from 'express';
import { ProfileDto } from '../dto/profile.dto';
export declare class userController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(body: any, req: any, response: Response): Promise<void>;
    getUser(body: any, params: {
        id: string;
    }, response: Response): Promise<void>;
    updateProfile(body: ProfileDto, request: Request, response: Response): Promise<void>;
    updateProfileImg(file: Express.Multer.File, req: Request, response: Response): Promise<void>;
    updateBkrdImg(file: any, req: Request, response: Response): Promise<void>;
    sendFrndRqst(params: {
        id: string;
    }, req: Request, response: Response): Promise<void>;
    acceptFrndRqst(params: {
        id: string;
    }, response: Response): Promise<void>;
}
