import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable} from 'rxjs';
import { UserService } from '../../services/user.service';
import * as bcrypt from 'bcrypt'
import { jwtHelper } from '../helper/jwt.helper';
import * as constants from '../constants'

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
          const isValid = await bcrypt.compare(request.body.password, userExists.password);
          if(!isValid)
            throw new HttpException(constants.NOT_MATCH , HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          const accessToken =await jwtHelper.generateToken(userExists);
          request.body.user = userExists;
          response.cookie("accessToken", accessToken)
          return next.handle();
      } else {
          throw new HttpException(constants.USERNAME_TAKEN, HttpStatus.BAD_REQUEST);
      }
    } else {
      if (request.url.includes('signup')) {
        return next.handle();
      } else {
        throw new HttpException(constants.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
   }
  }
}