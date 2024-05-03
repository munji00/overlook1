import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import * as multer from 'multer';
import { Request, Response } from 'express';
import * as path from 'path';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private multer:multer.Multer;

  constructor() {
    this.multer = multer({
      storage: multer.diskStorage({
        destination: 'src/public/images',
        filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = path.extname(file.originalname);
          const modifiedFileName = file.fieldname + '-' + uniqueSuffix + extension;
          cb(null, modifiedFileName);
        }
      }),
      
      fileFilter: (req:Request, file: Express.Multer.File, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException(`Unsupported file type ${path.extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
    });
  }
  
  use(req: Request, res: Response, next: () => void) {
    this.multer.single('profile')(req, res, next);
  }
}
