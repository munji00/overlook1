import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();
const secret = process.env.JWT_SECRET;


export const verifyUser = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).send({message:"unauthorized or empty token"})
    try {
        const {id, userName, mobileNumber }= await  jwt.verify(token , secret)
        req.headers['userId'] = id
        // req.user = {id, userName, mobileNumber };
        next();
    } catch (error) {
        res.status(401).send({mesaage:"Unauthorize or Invalid token"})
    }
}