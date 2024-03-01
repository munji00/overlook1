export interface createActivityI{
    friId:number;
    fraId:number;
    createdAt: Date;
    isAccepted:boolean;
}

export interface fetchActivityI{
    id:number;
    friId:number;
    fraId:number;
    createdAt: Date;
    isAccepted:boolean;
}