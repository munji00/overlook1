import { Entity, PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";
import UserPost from "./post.entity";


@Entity()
export default class PostLikes{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    userId:number;

    @Column()
    postId:number;

    @Column({default:"thumbsup"})
    reaction:string;
    
    @ManyToOne(() => UserPost, (userPost) => userPost.likes)
    post: UserPost;

}