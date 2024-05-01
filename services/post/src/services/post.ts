import UserPost from '../entities/post.entity';
import { AppDataSource } from '../../data-source';
import PostLikes from '../entities/postLikes.entity';
import PostComments from '../entities/postComments.entity';

const postRepository=AppDataSource.getRepository(UserPost);  
const likesRepository=AppDataSource.getRepository(PostLikes);
const commentsRepository=AppDataSource.getRepository(PostComments);
export const PostServices = {

     async createPost(postData: Partial<UserPost>): Promise<UserPost>{
        const post = postRepository.create(postData);
        return await postRepository.save(post);
    },
    
    async fetchPosts(): Promise<UserPost[]>{  
        return await postRepository.find();
    },
    
    async fetchPost(id: number): Promise<UserPost | undefined>{
        return await postRepository.findOne({where:{id}});
    },

    async fetchPostBy(id: number): Promise<UserPost[] | undefined>{
        return await postRepository.find({where:{userId:id}});
    },
    
    async updatePost(id: number, postData: Partial<UserPost>): Promise<UserPost | undefined>{
        const post = await postRepository.findOne({where:{id}});
        const newPost = postRepository.merge(post, postData)
        return await postRepository.save(newPost)
    },

    async deletePost(id:number): Promise<void>{
        await postRepository.delete(id);
    },

    async likePostToggle(likesData:any): Promise<string> {
        const { postId, userId} = likesData
        const alreadyLike = await likesRepository.findOne({where: {postId, userId}})
        if(!alreadyLike){
            const newLike = likesRepository.create(likesData);
            await likesRepository.save(newLike);
            return "like";
        }
        await likesRepository.delete(alreadyLike.id)
        return "unlike";
    },

    async createComment(commentsData:any): Promise<void>{
        const comments = commentsRepository.create(commentsData);
        await commentsRepository.save(comments)
    },

    async deleteComment(id:number): Promise<void>{
        await commentsRepository.delete(id);
    },
}

