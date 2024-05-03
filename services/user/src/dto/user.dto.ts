import {IsString, IsNotEmpty, MinLength, Matches, IsNumber} from 'class-validator'
import {Exclude} from 'class-transformer'
import { UserActivityResponseDto } from "./activity.dto";
import {UserAssetsResponseDto } from "./assets.dto";
import {UserProfileResponseDto } from "./profile.dto";

export class CreateUserDto{
    
    @IsString()
    @MinLength(3)
    readonly userName:string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    readonly password:string;

    @IsNotEmpty()
    @IsNumber()
    @Matches(/^(?:\+?91)?[6789]\d{9}$/)
    readonly mobileNumber:number;

}

export class UserResponseDto{
    
    @IsNumber()
    @IsNotEmpty()
    id:number;
    
    @IsString()
    @IsNotEmpty()
    userName:string;
    
    @IsNotEmpty()
    @IsNumber()
    mobileNumber:number;
    
    @Exclude()
    password?:string;

    profile?:UserProfileResponseDto;

    assets?:UserAssetsResponseDto;

    fri?:UserActivityResponseDto[];

    fra?:UserActivityResponseDto[];

}