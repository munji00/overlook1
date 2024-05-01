import "reflect-metadata"
import { DataSource } from "typeorm"
import UserPost from './src/entities/post.entity';
import PostLikes from './src/entities/postLikes.entity';
import PostComments from './src/entities/postComments.entity';
import PostShares from './src/entities/postShares.entity';


 export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@mu786mu@',
  database: 'post',
  synchronize: true,
  logging: false,
  entities: [UserPost, PostLikes, PostComments, PostShares],
  subscribers: [],
  migrations: [],
})