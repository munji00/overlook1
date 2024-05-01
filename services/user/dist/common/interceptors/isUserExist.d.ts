import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
export declare class ExistenceCheckInterceptor implements NestInterceptor {
    private readonly userService;
    constructor(userService: UserService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
