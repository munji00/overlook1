import {IsString, IsNumber, IsAlpha, IsEmail, Matches, MinLength, } from 'class-validator';
export class UpdateUserProfileDto{
    
    @IsString()
    @IsAlpha()
    @MinLength(3)
    firstName:string;

    @IsString()
    @IsAlpha()
    @MinLength(3)
    lastName:string;

    @IsString()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
    email:string;

    @IsString()
    @IsAlpha()
    gender:string;

    @IsString()
    occupation:string;

    @IsString()
    @IsAlpha()
    maritalStatus:string;

    @IsString()
    dob:string;

    @IsString()
    perAddress:string;

    @IsString()
    currAddress:string;
}


export class UserProfileResponseDto{
    @IsString()
    @IsAlpha()
    @MinLength(3)
    id:number;
    
    firstName:string;
    lastName:string;
    email:string;
    gender:string;
    occupation:string;
    maritalStatus:string;
    dob:string;
    perAddress:string;
    currAddress:string;
}