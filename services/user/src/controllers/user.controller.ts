import {
     Controller,
     Body,
     Res,
     Req,
     HttpException,
     HttpStatus,
     Get,
     Param,
     Put,
     UploadedFile
    } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response, Express, Request } from 'express';
import userProfile from '../database/entities/userProfile.entity';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}


   @Get('all')
    async getUsers(@Res() response:Response) {
        try{
            const users = await this.userService.fetchAll();
            response.status(200).send({success:true, data:users})
        }catch(error){
          if(error instanceof HttpException) throw error;
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('get/:id')
    async getUser(@Param() params:{id:string}, @Res() response:Response){
        const {id} = params;
        try{
            const user = await this.userService.fetchById(+id);
            response.status(200).send({success:true, data:user})
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put('update/:id')
    async updateProfile(@Param() params:{id:string},@Body() body:userProfile, @Res() response:Response){
        const {id} = params;
        try{
            const profile = await this.userService.updateProfile(+id, body);
            response.status(200).send({success:true, data:profile})
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('upload/profile_img/:id')
    async updateProfileImg(@UploadedFile() file:any,@Param() params:{id:string},  @Res() response:Response) {
        const {id} = params;
        try {
            await this.userService.updateProfileImg(+id, file.filename);
            response.status(200).send({success:true, message:"profile image uploaded successfully"})
        } catch (error) {
            console.log(error)
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('upload/back_img/:id')
    async updateBkrdImg(@UploadedFile() file:any,@Param() params:{id:string},  @Res() response:Response) {
        const {id} = params;
        try {
            await this.userService.updateBkgdImg(+id, file.filename);
            response.status(200).send({success:true,message:"background image uploaded successfully"})
        } catch (error) {
            if(error instanceof HttpException) throw error
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}