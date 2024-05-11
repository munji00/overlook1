
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



//Custom validation error messages
export const PASSWORD_LENGTH_VALIDATION_ERROR = "Password must be at least 8 characters long";
export const PASSWORD_PATTERN_VALIDATION_ERROR = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
export const MOB_NUM_LENGTH_VALIDATION_ERROR ="";
export const MOB_NUM_PATTERN_VALIDATION_ERROR = "Mobile number must be a valid number";
export const EMAIL_LENGTH_VALIDATION_ERROR ="";
export const EMAIL_PATTERN_VALIDATION_ERROR = "";