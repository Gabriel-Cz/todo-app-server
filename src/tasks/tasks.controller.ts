import { 
    Controller,
    Request, 
    UseGuards,
    Body, 
    Post, 
    Get, 
    Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ) {}

    @Get(':userId')
    @UseGuards(JwtAuthGuard)
    async findTasks(@Param('userId') userId: string): Promise<any> {
        return this.tasksService.findAll(userId);
    }

    @Post(':userId/new-task')
    @UseGuards(JwtAuthGuard)
    async createTask(
      @Param('userId') userId: string,
      @Body() createTaskBody: CreateTaskDto): Promise<any> {
        return this.tasksService.create(createTaskBody, userId);
    }

}
