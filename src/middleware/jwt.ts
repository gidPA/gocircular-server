import {verifyJwtToken} from "../helper/jwt"
import { Request, Response } from "hyper-express";

export const checkUserJwtToken = async (request: Request, response: Response) => {
    // console.log("request:");
    // console.log(request);

    // console.log("headers:");
    // console.log(request.headers);

    const headers = request.headers;
    const authHeaderStr = headers.authorization;
    const authHeaderSplitted = authHeaderStr.split(' ');
    const jwttoken = authHeaderSplitted[1];
    console.log(jwttoken);
    // let body = await request.json();
    // console.log("body:");
    // console.log(body);
    // const jwttoken = body.jwtToken;

    try{
        const checkresult = verifyJwtToken(jwttoken)
        if (checkresult.status === "valid"){
            return response.status(200).json({
                Ok: true,
                Error: null
            });
        } else {
            return response.status(403).json({
                Ok: false,
                Error: "Invalid Token"
            });
        }
    } catch(err) {
        return response.status(500).send("Internal Server Error");
    }
};
