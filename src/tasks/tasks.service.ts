import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) 
        private taskModel: Model<TaskDocument>
    ) {}

    async create(createTask: CreateTaskDto, userId: string): Promise<Task> {
        try {
            createTask.userId = userId;
            let createdTask = new this.taskModel(createTask);
            return createdTask.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(userId: string): Promise<Task[]> {
        try {
            return this.taskModel.find({userId: userId}).exec(); 
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
