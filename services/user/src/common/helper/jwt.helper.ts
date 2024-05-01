import * as jwt from 'jsonwebtoken';
import { jwt_payload } from '../../interfaces/jwt.interface';
import * as env from 'dotenv'

env.config()

const secretKey =process.env.JWT_SECRET

export const jwtHelper = {
    async generateToken(data:jwt_payload){
        return await jwt.sign(data, secretKey)
    },

    async verifyToken(token:string){
        return jwt.verify(token , secretKey)
    }
}