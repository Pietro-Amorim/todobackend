import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskEntity[] = [];
  private nextId = 1;

  async findAll(): Promise<TaskEntity[]> {
    return this.tasks;
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const newTask: TaskEntity = {
      id: this.nextId++,
      title,
      description,
      status: 'PENDING',
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findOne(id);

    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.status) {
      task.status = updateTaskDto.status;
    }

    return task;
  }

  async remove(id: number): Promise<void> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);

    if (this.tasks.length === initialLength) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
  }
}