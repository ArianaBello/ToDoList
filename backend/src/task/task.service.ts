import { Injectable, BadRequestException } from '@nestjs/common';
import {
    Prisma,
    PrismaClient,
    Task
} from '@prisma/client';

import { ITaskResponse, PriorityEnum, type ITaskRequest } from './types/types';
import { UserCognitoI } from 'src/auth/decorators/types';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaClient) { }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'asc',
            },
        });
    }

    async getTaskById(id: number): Promise<ITaskResponse | null> {
        const task = await this.prisma.task.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                date: true
            }
        });

        return task as ITaskResponse;
    }


    async createTask(data: ITaskRequest,  user: UserCognitoI): Promise<Task> {
        const date = new Date(data.date);

        const userId = user.userId;
        if (!userId) {
            throw new BadRequestException('User id is required to create a task');
        }

        return this.prisma.task.create({
            data: {
                name: data.name,
                description: data.description,
                date: date ?? new Date(),
                priority: data.priority ?? PriorityEnum.LOW,
                userId: userId
            },
        });
    }

    async updateTask(id: number, data: ITaskRequest): Promise<Task> {
        const date = new Date(data.date);

        return this.prisma.task.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                date: date ?? new Date(),
                updatedAt: new Date(),
                priority: data.priority ?? "",
            },
        });
    }

    async toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data: {
                completed,
                updatedAt: new Date(),
            },
        });
    }

    async updateTaskPriority(id: number, priority: PriorityEnum): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data: {
                priority,
                updatedAt: new Date(),
            },
        });
    }

    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id
            },
        });
    }

}
