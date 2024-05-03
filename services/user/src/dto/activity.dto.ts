export class CreateUserActivityDto{
    friId:number;
    fraId:number;
    isAccepted:boolean;
}

export class UserActivityResponseDto{
    id:number;
    friId:number;
    fraId:number;
    createdAt: Date;
    isAccepted:boolean;
}