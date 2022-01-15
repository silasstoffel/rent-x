// Override Request of Express

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        }
    }
}
