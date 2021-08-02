import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ type: String,  required: [true, 'You need to add some content first.'] })
    content: string;

    @Prop({ type: Date })
    date?: Date;

    @Prop({ type: String })
    userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);