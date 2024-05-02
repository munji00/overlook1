import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable} from 'rxjs';
import { UserService } from '../../services/user.service';
import * as bcrypt from 'bcrypt'
import { jwtHelper } from '../helper/jwt.helper';

@Injectable()
export class ExistenceCheckInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { userName } = request.body; 

    const userExists = await this.userService.fetchOne(userName);

    if (userExists) {
      if(request.url.includes('signin')) {
          request.body.userData=userExists
          const isValid = await bcrypt.compare(request.body.password, userExists.password);
          if(!isValid)
            throw new HttpException('password or username incorrect' , HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          const accessToken =await jwtHelper.generateToken(userExists);
          request.body.user = userExists;
          response.cookie("accessToken", accessToken)
          return next.handle();
      } else {
          throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
      }
    } else {
      if (request.url.includes('signup')) {
        return next.handle();
      } else {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
   }
  }
}