import { Controller, Post, Body, Res, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import * as constants from '../common/constants'
import { UserService } from 'src/services/user.service';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { ExistenceCheckInterceptor } from '../common/interceptors/isUserExist'
import { CreateUserDto, UserResponseDto } from 'src/dto/user.dto';

@Controller('user/auth')
export class authController {
  constructor(private readonly userService: UserService) {}


   @Post('signup')
   @UseInterceptors(ExistenceCheckInterceptor)
    async signup(@Body() createUserDto:CreateUserDto, @Res() response:Response) {
        try{
            const userData = await this.userService.create(createUserDto);
            response.status(201).send({
                success:true, 
                message:constants.SIGNUP_SUCCESSED, 
                data:plainToClass(UserResponseDto, userData)
            })
        }catch(error){
          if(error instanceof HttpException) throw error;
            throw new HttpException(constants.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('signin')
    @UseInterceptors(ExistenceCheckInterceptor)
    async signin(@Body() credentials:Partial<CreateUserDto>, @Res() response:Response){
        try{
            const user = await this.userService.fetchOne(credentials.userName)
            response.status(200).send({
                success:true, 
                message:constants.SIGNIN_SUCCESSED, 
                user:plainToClass(UserResponseDto, user)})    
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}