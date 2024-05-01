
import { services } from '../index.js'
import { verifyUser } from './verifyUser.js'

export const globalMiddleware = async(req, res, next) => {
    const { baseUrl } = req;
    const {service} = req.params;
    if (services.hasOwnProperty(service)){
        if (baseUrl.includes('auth')) {
            next();
        } else {
           await verifyUser(req, res, next);
        }
    } else {
        res.status(404).send('Service not found');
    }
}
