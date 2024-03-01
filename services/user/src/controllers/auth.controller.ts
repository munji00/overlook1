import { Controller, Post, Body, Res, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/services/user.service';
import { Response } from 'express';
import User from '../database/entities/user.entity'
import { ExistenceCheckInterceptor } from '../common/interceptors/isUserExist';
import { jwtHelper } from '../common/helper/jwt.helper';

@Controller('user/auth')
export class authController {
  constructor(private readonly userService: UserService) {}


   @Post('signup')
   @UseInterceptors(ExistenceCheckInterceptor)
    async signup(@Body() user:User, @Res() response:Response) {
        try{
            const userData = await this.userService.create(user);
            response.status(201).send({success:true, message:"signup successfully", data:userData})
        }catch(error){
          if(error instanceof HttpException) throw error;
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('signin')
    @UseInterceptors(ExistenceCheckInterceptor)
    async signin(@Body() user:User, @Res() response:Response){
        try{
            const userData = await this.userService.fetchOne(user.userName);
            const isValid = await bcrypt.compare(user.password, userData.password);
            if(!isValid)
             throw new HttpException('password or username incorrect' , HttpStatus.NON_AUTHORITATIVE_INFORMATION)
            const accessToken =await jwtHelper.generateToken({userName:userData.userName ,id:userData.id}) 
            response.cookie("accessToken", accessToken)
            response.status(200).send({success:true, message:"signin successfully", data:userData})    
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}