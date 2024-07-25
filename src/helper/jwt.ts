import jwt, {JwtPayload} from 'jsonwebtoken';
import { envConfig } from '../config';

interface UserJwtPayload extends JwtPayload {
    userid: number;
    role: string;   
}

export const generateUserJwtToken = (id: number, role: string) =>{
    const jwtSecretKey = process.env.JWT_SECRET_KEY || envConfig.jwt.secretKey;

    if (!jwtSecretKey) {
        throw new Error("JWT secret key is not defined.");
    }

    const data = {
        userid: id,
        role: role,
        iat: Math.floor(Date.now() / 1000)
    };

    const jwtOptions = {
        expiresIn: '1h',
    };

    const token = jwt.sign(data, jwtSecretKey, jwtOptions);
    //console.log("token:")
    //console.log(token);
    return token;
}

export const verifyJwtToken = (token: string) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || envConfig.jwt.secretKey;

    if (!jwtSecretKey) {
        throw new Error("JWT secret key is not defined.");
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey) as UserJwtPayload;
        
        if (decoded && decoded.userid && decoded.role) {
            return {
                status: "valid",
                userid: decoded.userid,
                role: decoded.role
            };
        } else {
            return {
                status: "invalid"
            };
        }
    } catch(err) {
        return {
            status: "invalid"
        };
    }
}
