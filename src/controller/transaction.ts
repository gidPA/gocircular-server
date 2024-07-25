import { db } from '../helper/db';
import { Request, Response } from 'hyper-express';

export const createTransactionRecord = async(request: Request, response: Response) => {
    let body = await request.json();
    
    const status = body.status;
    const userid = body.userid;
    const rvmid = body.rvmid;
    const totalpoint = body.totalpoint;

    const recyclablelist = body.recyclable;

}

export const getTransactionRecords = async(request: Request, response: Response) => {

}

export const deleteTransactionRecord = async(request: Request, response: Response) => {

}