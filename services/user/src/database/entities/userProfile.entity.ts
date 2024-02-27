import { Entity, PrimaryGeneratedColumn,Column, OneToOne, JoinColumn} from "typeorm";
import User from "./user.entity";


@Entity()
export default class userProfile{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:""})
    firstName:string;

    @Column({default:""})
    lastName:string;

    @Column({default:""})
    email:string;

    @Column({default:""})
    gender:string;

    @Column({default:""})
    occupation:string;

    @Column({default:""})
    maritalStatus:string;

    @Column({default:""})
    dob:string;

    @Column({default:""})
    perAddress:string;

    @Column({default:""})
    currAddress:string;
}