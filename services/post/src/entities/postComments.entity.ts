import { Entity, PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";
import UserPost from "./post.entity";


@Entity()
export default class PostComments{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    userId:number;

    @Column()
    postId:number;
    
    @Column()
    comment:string;

    @ManyToOne(() => UserPost, (userPost) => userPost.comments)
    post: UserPost;
}