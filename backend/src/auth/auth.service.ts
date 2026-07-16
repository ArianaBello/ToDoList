import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaClient,
    ) { }

    async validateUser(user: LoginDto) {
        const foundUser = await this.prisma.user.findUnique({
            where: { email: user.email },
        });

        if (!foundUser) return null;

        if (foundUser.password === user.password) {
            return this.jwtService.sign({
                id: foundUser.id,
                email: foundUser.email,
            });
        }
    }

    async handlerRegister(user: RegisterDto) {
        const foundUser = await this.prisma.user.findUnique({
            where: { email: user.email },
        });

        if (foundUser) throw new HttpException('user existing in the system', HttpStatus.NOT_FOUND);

        const _password = user.password;

        const response = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: _password,
            }
        });

        const validated = await this.validateUser({
            email: response.email,
            password: response.password,
        })

        if (!validated) throw new HttpException('Error to generate token', HttpStatus.BAD_REQUEST)

        return validated;
    }
}
