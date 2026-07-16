import { ApiProperty } from '@nestjs/swagger';

// export class LoginDto {
//     @ApiProperty({ required: true })
//     //@ts-ignore
//     email: string;

//     @ApiProperty({ required: true })
//     //@ts-ignore
//     password: string;
// }

export interface LoginDto {
    email: string;
    password: string;
}
