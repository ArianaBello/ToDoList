import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

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
        const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
        if (!isPasswordValid) throw new HttpException('user.auth.invalid_user_auth', HttpStatus.NOT_FOUND);
        
        const { password: _password, ...userWithoutPassword } = foundUser;
        return {
            token: this.jwtService.sign(userWithoutPassword),
        }
    }

    async handlerRegister(user: RegisterDto) {
        const foundUser = await this.prisma.user.findUnique({
            where: { email: user.email },
        });

        if (foundUser) throw new HttpException('user existing in the system', HttpStatus.NOT_FOUND);

        const hashedPassword: string = await bcrypt.hash(user.password, 10); // 

        const response = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
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
