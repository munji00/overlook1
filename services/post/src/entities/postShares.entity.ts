import { Entity, PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";
import UserPost from "./post.entity";


@Entity()
export default class PostShares{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:number;
    
    @Column()
    recipientId:number;

    @ManyToOne(() => UserPost, (userPost) => userPost.shares)
    post: UserPost;
}