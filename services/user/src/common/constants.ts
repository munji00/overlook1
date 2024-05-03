
import * as env from 'dotenv';
env.config();


//Exceptions
export const USERNAME_TAKEN = "This user name have already taken"
export const NOT_FOUND = 'User not found for this user name'
export const NOT_MATCH = 'User name or password is incorrect'
export const SERVER_ERROR = 'Internal server error'


// Response
export const SIGNUP_SUCCESSED = 'User signup successfully'
export const SIGNIN_SUCCESSED = 'User signin successfully'
export const PROF_IMG_UPLOADED = "profile image uploaded successfully"
export const BKGD_IMG_UPLOADED = "Background image uploaded successfully"
export const FRND_REQUEST_SENT = "Freind request have sent successfully"
export const FRND_REQUEST_ACCEPTED = 'Freind request accepted'


//Environment
export const PORT = process.env.PORT;
export const DATABASE_PORT = process.env.DB_PORT;
export const DATABASE_USERNAME = process.env.DB_USERNAME;
export const DATABASE_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE_NAME = process.env.DB_NAME
export const DATABASE_HOST = process.env.DB_HOST