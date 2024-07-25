import {MiddlewareNext, Request, Response} from 'hyper-express';


const corsMiddleware = async(request: Request, response: Response, next: MiddlewareNext) => {
    const origin = request.headers.origin;

    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //response.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if you need to include credentials
    next();
}

export default corsMiddleware;