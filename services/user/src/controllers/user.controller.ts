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
     UploadedFile
    } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response, Express, Request } from 'express';
import { ProfileDto } from '../dto/profile.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}


   @Get('all')
    async getUsers(@Body() body:any ,@Res() response:Response){
        try{
            const users = await this.userService.fetchAll();
            response.status(200).send({success:true, data:users})
        }catch(error){
          if(error instanceof HttpException) throw error;
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('get/:id')
    async getUser(@Body() body:any ,@Param() params:{id:string}, @Res() response:Response){
        const {id} = params;
        try{
            const user = await this.userService.fetchById(+id);
            response.status(200).send({success:true, data:user})
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put('update')
    async updateProfile(@Body() body:any,@Req() request:Request, @Res() response:Response){
        const {user, ...rest} = body
        try{
            const userData = await this.userService.fetchById(user.id);
            const profile = await this.userService.updateProfile(userData.profile.id, rest);
            response.status(200).send({success:true, data:profile})
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('upload/profile_img')
    async updateProfileImg(@Req() req:any,  @Res() response:Response) {
        const userId = req.headers['userid'];
        try {
            const userData = await this.userService.fetchById(+userId);
            await this.userService.updateProfileImg(userData.assets.id, req.file.filename);
            response.status(200).send({success:true, message:"profile image uploaded successfully"})
        } catch (error) {
            console.log(error.message)
            if(error instanceof HttpException) throw error.message
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('upload/back_img')
    async updateBkrdImg(@UploadedFile() file:any,@Req() req:Request,  @Res() response:Response) {
        const userId = req.headers['user-id'];
        try {
            const user = await this.userService.fetchById(+userId)
            await this.userService.updateBkgdImg(user.assets.id, file.filename);
            response.status(200).send({success:true,message:"background image uploaded successfully"})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('request/send/:id')
    async sendFrndRqst(@Param() params:{id:string},@Req() req:Request, @Res() response:Response) {
        const userId = req.headers['user-id'];
        const {id} = params;
        try {
            await this.userService.createActivity({friId:+userId, fraId:+id, isAccepted:false, createdAt:new Date()});
            response.status(200).send({success:true,message:"Freind request have send successfully"})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('request/accept/:id')
    async acceptFrndRqst(@Param() params:{id:string}, @Res() response:Response) {
        const {id} = params;
        try {
            await this.userService.updateActivity(+id);
            response.status(200).send({success:true,message:"Freind request accepted"})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}