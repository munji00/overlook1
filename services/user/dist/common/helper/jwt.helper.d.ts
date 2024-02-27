import { jwt_payload } from '../../interfaces/jwt.interface';
export declare const jwtHelper: {
    generateToken(data: jwt_payload): Promise<any>;
    verifyToken(token: string): Promise<any>;
};
