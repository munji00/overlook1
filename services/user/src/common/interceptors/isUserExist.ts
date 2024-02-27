import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable} from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class ExistenceCheckInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userName } = request.body; 

    const userExists = await this.userService.fetchOne(userName);

    if (userExists) {
      if(request.url.includes('signin')) {
          request.body.userData=userExists
          return next.handle();
      } else {
          throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
      }
    } else {
      // If user doesn't exist and trying to sign up, allow the request
      if (request.url.includes('signup')) {
        return next.handle();
      } else {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
   }
  }
}