import { Injectable } from '@nestjs/common';
import {
    Prisma,
    PrismaClient,
    Task
} from '@prisma/client';

import { type ITaskRequest } from './types/types';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaClient) { }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTaskById(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async createTask(data: ITaskRequest): Promise<Task> {
        const date = new Date(data.date);

        return this.prisma.task.create({
            data: {
                name: data.name,
                description: data.description,
                date: date ?? new Date(),
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
