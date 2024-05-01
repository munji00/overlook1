import { Entity, PrimaryGeneratedColumn,Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany} from "typeorm";
import PostLikes from "./postLikes.entity";
import PostComments from "./postComments.entity";
import PostShares from "./postShares.entity";


@Entity()
export default class UserPost{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:""})
    tags:string;

    @Column({default:""})
    caption:string;

    @Column({default:""})
    content:string;

    @Column()
    userId:number;

    @OneToMany(() => PostLikes, (postLikes) => postLikes.post, {cascade:true})
    @JoinColumn()
    likes: PostLikes[]

    @OneToMany(() => PostComments, (postComments) => postComments.post)
    @JoinColumn()
    comments: PostComments[]

    @OneToMany(() => PostShares, (postShares) => postShares.post)
    @JoinColumn()
    shares: PostComments[]

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;
}