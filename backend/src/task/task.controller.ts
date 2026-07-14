import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import type { Prisma } from '@prisma/client';

@Controller("tasks")
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks()
    }

    @Post()
    async createTask(
        @Body() data: Prisma.TaskCreateInput
    ) {
        return this.taskService.createTask(data)
    }

    @Get(':id')
    async getTaskById(
        @Param('id', ParseIntPipe) id: string
    ) {
        const taskFound = await this.taskService.getTaskById(Number(id))
        if (!taskFound) throw new NotFoundException('Task does not exist')
        return taskFound
    }

    @Delete(':id')
    async deleteTask(
        @Param('id', ParseIntPipe) id: string
    ) {
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException('Task does not exist')
        }
    }

    @Put(':id')
    async updateTask(
        @Param('id', ParseIntPipe) id: string, 
        @Body() data: Prisma.TaskUpdateInput
    ) {
        try {
            return await this.taskService.updateTask(Number(id), data)
        } catch (error) {
            throw new NotFoundException('Task does not exist')
        }
    }
}       
