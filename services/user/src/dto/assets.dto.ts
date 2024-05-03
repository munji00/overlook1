import { IsString } from 'class-validator'
export class CreateUserAssetsDto{

    @IsString()
    userProfile?:string;
    
    @IsString()
    userBackground?:string;
}


export class UserAssetsResponseDto{

    id:number;

    userProfile:string;

    userBackground:string;

}