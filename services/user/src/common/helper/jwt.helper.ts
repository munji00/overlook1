import * as jwt from 'jsonwebtoken';
import { jwt_payload } from '../../interfaces/jwt.interface';
import * as env from 'dotenv'

env.config()

const secretKey =process.env.JWT_SECRET

export const jwtHelper = {
    async generateToken(data:any){
        const{id ,userName, mobileNumber} = data;
        return await jwt.sign({id, userName, mobileNumber}, secretKey)
    },

    async verifyToken(token:string){
        return jwt.verify(token , secretKey)
    }
}