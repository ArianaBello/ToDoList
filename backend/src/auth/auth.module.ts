import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwsStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: 'qwerty',
      signOptions: {
        expiresIn: '24 h',
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwsStrategy],
})
export class AuthModule { }
