import { Entity, PrimaryGeneratedColumn,Column, OneToOne, JoinColumn} from "typeorm";
import User from "./user.entity";


@Entity()
export default class UserAssets{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:""})
    userProfile:string;

    @Column({default:""})
    userBackground:string;
}