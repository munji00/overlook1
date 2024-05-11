import {IsString, IsNotEmpty, MinLength, Matches, IsNumber} from 'class-validator'
import {Exclude} from 'class-transformer'
import { UserActivityResponseDto } from "./activity.dto";
import {UserAssetsResponseDto } from "./assets.dto";
import {UserProfileResponseDto } from "./profile.dto";
import * as constants from '../common/constants'

export class CreateUserDto{
    
    @IsString()
    @MinLength(3)
    readonly userName:string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message:constants.PASSWORD_LENGTH_VALIDATION_ERROR})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,
        {message:constants.PASSWORD_PATTERN_VALIDATION_ERROR}
    )
    readonly password:string;

    @IsNotEmpty()
    @Matches(/^[6-9]\d{9}$/, {message:constants.MOB_NUM_PATTERN_VALIDATION_ERROR})
    readonly mobileNumber:string;

}

export class UserResponseDto{
    id:number;
    
    userName:string;
    
    mobileNumber:string;
    
    @Exclude()
    password?:string;

    status:string;

    isDeleted:boolean;

    profile?:UserProfileResponseDto;

    assets?:UserAssetsResponseDto;

    fri?:UserActivityResponseDto[];

    fra?:UserActivityResponseDto[];

}