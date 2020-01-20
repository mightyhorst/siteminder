export interface IEmail{
    email: string;
    name?: string;
}


export interface IWelcomeTemplateData{
    header?: string;
    subHeader?: string;
    body?: string;
    imageUrl?: string;
    button?: string;
    buttonUrl?: string;
}
export type TDynamicTemplateData = IWelcomeTemplateData | any;

export interface IEmailResponse{
    data?: any,
    status: number, 
    statusText: string
}