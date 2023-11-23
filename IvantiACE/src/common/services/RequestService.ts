import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { HttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import { IRequestService } from "./IRequestService";
import { INewRequest, IRequestAPIResponse, Request } from "../models/IRequest";

export class RequestService implements IRequestService {

    public static readonly serviceKey: ServiceKey<IRequestService> = 
        ServiceKey.create<IRequestService>('Ivanti.RequestService', RequestService);

    private _requestAPI: HttpClient    

    constructor(serviceScope: ServiceScope) { 
        serviceScope.whenFinished(() => {
            this._requestAPI = serviceScope.consume(HttpClient.serviceKey);
        });
    }
    public postNewRequestForUser(request: Request, userName: string): Promise<boolean> {
        if (this._requestAPI === undefined){
            throw new Error('RequestService not initialized!')
        }

        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');

        const newRequest: INewRequest = {
            request: request
        };
  
        const body: string = JSON.stringify(newRequest);
  
        const httpClientOptions: IHttpClientOptions = {
            body: body,
            headers: requestHeaders
        };
  
        return this._requestAPI.post(
          `https://ag-viva-connections-requests.azurewebsites.net/api/CreateRequestForUser?usersEmail=${userName}`,
          HttpClient.configurations.v1, 
          httpClientOptions)
          .then(response => {
            return response.status === 200;
          });
    }
    

    public getActiveRequestsForUser(userName: string): Promise<IRequestAPIResponse> {
        if (this._requestAPI === undefined){
            throw new Error('RequestService not initialized!')
        }

        return this._requestAPI.get(
            `https://ag-viva-connections-requests.azurewebsites.net/api/GetUsersRequests?usersEmail=${userName}`,
            HttpClient.configurations.v1
        )
        .then((response: any) => response.json())
        .then((jsonResponse: any) => 
        {
            return {
                requests: jsonResponse.requests,
                usersEmail: jsonResponse.usersEmail
            }
        });
    }
}