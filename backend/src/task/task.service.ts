import { Injectable } from '@nestjs/common';
import { 
    Prisma, 
    PrismaClient, 
    Task 
} from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaClient) { }

    private normalizeDateField(date?: Prisma.TaskCreateInput['date'] | Prisma.TaskUpdateInput['date']) {
        if (!date) return undefined;

        if (typeof date === 'string') {
            return new Date(date);
        }

        if (date instanceof Date) {
            return date;
        }

        if (typeof date === 'object' && 'set' in date && typeof date.set === 'string') {
            return {
                ...date,
                set: new Date(date.set),
            };
        }

        return date;
    }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTaskById(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        const normalizedDate = this.normalizeDateField(data.date) as string | Date;

        return this.prisma.task.create({
            data: {
                ...data,
                date: normalizedDate,
            },
        });
    }

    async updateTask(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
        const normalizedDate = this.normalizeDateField(data.date);

        return this.prisma.task.update({
            where: { id },
            data: {
                ...data,
                ...(normalizedDate !== undefined ? { date: normalizedDate } : {}),
            },
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
