import bcrypt from 'bcrypt';
import { db } from '../helper/db';
import { Request, Response } from 'hyper-express';
import {generateUserJwtToken} from '../helper/jwt'




export const login = async (request: Request, response: Response)=>{
    try {
        //console.log(request);
        let body = await request.json();
        // console.log(body);
        // console.log(`email: ${body.email}`);
        // console.log(`password: ${body.password}`);

        const row = await db.queryDatabase("SELECT * from user WHERE email=?", [body.email]);
        const userObj = row[0];
        // console.log(row);
        // console.log(userObj.password);
        const comparation = await bcrypt.compare(body.password, userObj.password);
        // console.log(comparation);
        if(userObj){
            let jwtToken = generateUserJwtToken(userObj.userid, "admin");
            console.log(jwtToken);
            return response.status(201)
                .json({ 
                    message: "succesfully logged in",
                    jwtToken: jwtToken
                });
        } else {
            return response.status(401).send("Invalid Cred");
        }
    }
    catch(err){
        console.log(`Error: \n${err}`)
        return response.status(500).json({"error":"Internal Server Error"});
    }
};

export const register = async (request: Request, response: Response) => {
    try{
        let body = await request.json();

        
        const email = body.email;
        const username = body.username;
        const password = body.password;
        const role: string = body.role;

        role.toUpperCase();

        const hashedPass = await bcrypt.hash(password, 10);

        const row = await db.queryDatabase("SELECT * from user WHERE email=?", [email]);
        console.log(row);

        //Handle already existing user
        if (row[0]){
            return response.status(409).send("User already exist");
        }

        const dbOut = await db.queryDatabase('INSERT INTO user (email, username, password, role) VALUES (?, ?, ?, ?)', [email, username, hashedPass, role]);

        return response.status(201).send("New Entry Created")
    } catch(err){
        console.log(err);
    }

}

export const readAccount = async (request: Request, response: Response) => {
    const id = request.query.id;
}

export const updateAccount = async (request: Request, response: Response) => {
    
}

export const deleteAccount = async (request: Request, response: Response) => {

}