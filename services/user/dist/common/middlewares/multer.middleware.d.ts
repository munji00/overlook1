import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class MulterMiddleware implements NestMiddleware {
    private multer;
    constructor();
    use(req: Request, res: Response, next: () => void): void;
}
