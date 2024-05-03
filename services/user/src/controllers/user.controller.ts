import {
     Controller,
     Body,
     Res,
     Req,
     HttpException,
     HttpStatus,
     Get,
     Post,
     Param,
     Put,
     UploadedFile,
     ParseIntPipe
    } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response, Request } from 'express';
import {UpdateUserProfileDto } from '../dto/profile.dto';
import * as constants from '../common/constants'
import { Express } from 'express';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from 'src/dto/user.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}


   @Get('all')
    async getUsers(@Res() response:Response){
        try{
            const users = await this.userService.fetchAll();
            response.status(200).send({success:true, data:plainToClass(UserResponseDto, users)})
        }catch(error){
          if(error instanceof HttpException) throw error;
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('get/:id')
    async getUser(@Param('id', ParseIntPipe) userId:number, @Res() response:Response){
        console.log(userId)
        try{
            const user = await this.userService.fetchById(userId);
            response.status(200).send({success:true, data:plainToClass(UserResponseDto, user)})
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put('update')
    async updateProfile(@Body() body:Partial<UpdateUserProfileDto>,@Req() request:Request, @Res() response:Response){
        const id = request.headers['user-id']
        try{
            const userData = await this.userService.fetchById(+id);
            const profile = await this.userService.updateProfile(userData.profile.id, body)
            response.status(200).send({success:true, data:profile})
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('upload/profile_img')
    async updateProfileImg(@Req() req:Request,  @Res() response:Response) {
        const userId = req.headers['user-id'];
        try {
            const userData = await this.userService.fetchById(+userId);
            await this.userService.updateProfileImg(userData.assets.id, req.file.filename);
            response.status(200).send({success:true, message:constants.PROF_IMG_UPLOADED})
        } catch (error) {
            if(error instanceof HttpException) throw error.message
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('upload/back_img')
    async updateBkrdImg(@UploadedFile() file:Express.Multer.File,@Req() req:Request,  @Res() response:Response) {
        const userId = req.headers['user-id'];
        try {
            const user = await this.userService.fetchById(+userId)
            await this.userService.updateBkgdImg(user.assets.id, file.filename);
            response.status(200).send({success:true,message:constants.BKGD_IMG_UPLOADED})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('request/send/:id')
    async sendFrndRqst(@Param('id' , ParseIntPipe) fraId:number,@Req() req:Request, @Res() response:Response) {
        const userId = req.headers['user-id'];
        try {
            await this.userService.createActivity({friId:+userId, fraId, isAccepted:false});
            response.status(200).send({success:true,message:constants.FRND_REQUEST_SENT})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('request/accept/:id')
    async acceptFrndRqst(@Param('id' , ParseIntPipe) activitId:number, @Res() response:Response) {
        try {
            await this.userService.updateActivity(activitId);
            response.status(200).send({success:true,message:constants.FRND_REQUEST_ACCEPTED})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}