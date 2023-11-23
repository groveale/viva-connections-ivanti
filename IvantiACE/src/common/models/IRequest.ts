export interface IRequest {
    number: string;
    shortDescription: string;
    callerId: string;
    sysUpdatedOn: Date;
    category: string;
    urgency: string;
    lastUpdatedString: string;
  }

  export class Request implements IRequest {
    constructor(
      public number: string = "",
      public shortDescription: string = "",
      public callerId: string = "",
      public sysUpdatedOn: Date = new Date(),
      public category: string = "",
      public urgency: string = "",
      public lastUpdatedString: string = ""
    ) { }
  }

  export interface INewRequest {
    request: IRequest;
  }

  export interface IRequestAPIResponse {
    requests: IRequest[];
    usersEmail: string;
  }
  