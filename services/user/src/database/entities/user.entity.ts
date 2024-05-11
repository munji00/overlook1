import { Entity, PrimaryGeneratedColumn,Column, OneToMany, BeforeInsert, OneToOne, JoinColumn} from "typeorm";
import * as bcrypt from 'bcrypt'
import UserActivity from "./userActivity.entity";
import UserAssets from "./userAssets.entity";
import UserProfile from "./userProfile.entity";


@Entity()
export default class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userName!:string;

    @Column()
    password!:string;

    @BeforeInsert()
    async hashedPassword(){
      this.password = await bcrypt.hash(this.password, 10);
    }

    @Column()
    mobileNumber:string;

    @Column({nullable:true})
    status:string;


    @Column({default:false})
    isDeleted:boolean;
    
    @OneToOne(()=> UserProfile, {cascade:true})
    @JoinColumn()
    profile:UserProfile;

    @OneToOne(()=> UserAssets, {cascade:true})
    @JoinColumn()
    assets:UserAssets;

    @OneToMany(() => UserActivity, (userActivity) => userActivity.fri)
    fri: UserActivity[]

    @OneToMany(() => UserActivity, (userActivity) => userActivity.fra)
    fra: UserActivity[]

}