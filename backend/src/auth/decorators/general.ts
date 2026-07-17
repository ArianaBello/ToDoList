import {
    createParamDecorator,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserCognitoI } from './types';
import { Socket } from 'socket.io';

export const TypeUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): UserCognitoI => {
        const request = getRequest(ctx);
        if (!request?.user) {
            throw new HttpException(
                'general.common.not_found_user',
                HttpStatus.UNAUTHORIZED
            );
        }
        return request.user;
    }
);

function getRequest(context: ExecutionContext): any {
    if (context.getType() === 'ws') {
        return context.switchToWs().getClient<Socket>();
    }
    return context.switchToHttp().getRequest();
}