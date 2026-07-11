import { Injectable } from '@nestjs/common';
import { 
    Prisma, 
    PrismaClient, 
    Task 
} from '@prisma/client';

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

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data
        });
    }

    async updateTask(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data
        });
    }

    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id
            }
        });
    }

}
