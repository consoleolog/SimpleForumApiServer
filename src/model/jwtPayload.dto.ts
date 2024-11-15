export type TokenType = 'access' | 'refresh';


export interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    type: TokenType;
}