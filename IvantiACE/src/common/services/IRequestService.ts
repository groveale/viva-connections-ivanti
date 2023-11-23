import { Request, IRequestAPIResponse } from "../models/IRequest";

export interface IRequestService {  
    getActiveRequestsForUser(userName: string): Promise<IRequestAPIResponse>;
    postNewRequestForUser(request: Request, userName: string): Promise<boolean>;
}