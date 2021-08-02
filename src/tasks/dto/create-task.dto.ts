import { ObjectId } from 'mongoose';

export class CreateTaskDto {
    userId?: any;
    content: string;
    date?: Date;
}