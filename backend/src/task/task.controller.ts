import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { PriorityEnum, type ITaskRequest } from './types/types';
import { TypeUser } from 'src/auth/decorators/general';
import type { UserCognitoI } from 'src/auth/decorators/types';

@Controller("tasks")
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks()
    }

    @Post()
    async createTask(
        @Body() data: ITaskRequest,
        @TypeUser() user: UserCognitoI,
    ) {
        return this.taskService.createTask(data, user)
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
        @Body() data: ITaskRequest
    ) {
        try {
            return await this.taskService.updateTask(Number(id), data)
        } catch (error) {
            throw new NotFoundException('Task does not exist')
        }
    }

    @Put('completed/:id')
    async toggleTaskCompletion(
        @Param('id', ParseIntPipe) id: string,
        @Body('completed') completed: boolean
    ) {
        try {
            return await this.taskService.toggleTaskCompletion(Number(id), completed)
        } catch (error) {
            throw new NotFoundException('Task does not exist')
        }
    }

    @Put('priority/:id')
    async updateTaskPriority(
        @Param('id', ParseIntPipe) id: string,
        @Body('priority') priority: PriorityEnum
    ) {
        try {
            return await this.taskService.updateTaskPriority(Number(id), priority)
        } catch (error) {
            throw new NotFoundException('Task does not exist')
        }
    }
}       
