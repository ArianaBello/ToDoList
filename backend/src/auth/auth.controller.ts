import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async Login(@Body() data: LoginDto) {
        const userToken = await this.authService.validateUser(data)

        if (!userToken) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

        return userToken;
    }

    @Post('register')
    async Register(@Body() data: RegisterDto) {
        return await this.authService.handlerRegister(data);
    }
}
