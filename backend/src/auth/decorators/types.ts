export interface UserCognitoI {
    id: number,
    userId: number,
    name: string,
    email: string,
    createdAt: string | Date,
    iat: number,
    exp: number
}