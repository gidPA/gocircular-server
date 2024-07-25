import {Request, Response} from "hyper-express";
import {db} from "../helper/db";

export const register = async (request: Request, response: Response) => {
    try{
        let body = await request.json();

        const securityKey: string = body.securityKey;

        const dbOut = await db.queryDatabase('INSERT INTO rvm (securityKey) VALUES (?)', [securityKey]);

        return response.status(201).send("New Entry Created")
    } catch(err){
        console.log(err);
    }

}

export const authenticate = async (request: Request, response: Response) => {
    
}