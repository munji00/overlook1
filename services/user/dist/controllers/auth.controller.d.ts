import { UserService } from 'src/services/user.service';
import { Response } from 'express';
import User from '../database/entities/user.entity';
export declare class authController {
    private readonly userService;
    constructor(userService: UserService);
    signup(user: User, response: Response): Promise<void>;
    signin(user: User, response: Response): Promise<void>;
}
