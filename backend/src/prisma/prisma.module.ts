import { Global, Module } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
    providers: [
        {
            provide: PrismaClient,
            useFactory: () => {
                const adapter = new PrismaPg({
                    connectionString: process.env.DATABASE_URL!,
                });

                return new PrismaClient({ adapter });
            },
        },
    ],
    exports: [PrismaClient],
})
export class PrismaModule { }