import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { userController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { DatabaseModule } from './database.module';
import { UserRepoProvider } from '../providers/userRepo.provider';
import { ProfileRepoProvider } from '../providers/profileRepo.provider';
import { AssetsRepoProvider } from '../providers/assetsRepo.provider';
import { MulterMiddleware } from '../common/middlewares/multer.middleware';

@Module({
  imports: [DatabaseModule],
  controllers:[userController],
  providers:[
    ...UserRepoProvider,
    ...ProfileRepoProvider,
    ...AssetsRepoProvider,
    UserService
],
  exports:[
    ...UserRepoProvider,
    ...ProfileRepoProvider,
    ...AssetsRepoProvider,
    UserService
]
})
export class userModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MulterMiddleware)
      .forRoutes(
        { path: 'user/upload/profile_img/:id', method: RequestMethod.PUT },
        { path: 'user/upload/back_img/:id', method: RequestMethod.PUT }
        );
  }
}