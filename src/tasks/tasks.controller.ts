import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/tasks.entity';

/**
 * Controlador responsável por gerenciar as operações CRUD de tarefas.
 * O decorator @Controller('tasks') define '/tasks' como o prefixo de rota
 * para todos os endpoints definidos nesta classe.
 */
@Controller('tasks')
export class TasksController {
  /**
   * Injeção de dependência do TasksService para utilização dos métodos de negócio.
   * @param tasksService - Instância do serviço de tarefas.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Rota para obter todas as tarefas.
   * Mapeado para o método HTTP GET em '/tasks'.
   * @returns Lista de todas as tarefas.
   */
  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return await this.tasksService.findAll();
  }

  /**
   * Rota para obter uma tarefa específica pelo ID.
   * Mapeado para o método HTTP GET em '/tasks/:id'.
   * @param id - ID da tarefa a ser recuperada (convertido para número via ParseIntPipe).
   * @returns A tarefa encontrada.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return await this.tasksService.findOne(id);
  }

  /**
   * Rota para criar uma nova tarefa.
   * Mapeado para o método HTTP POST em '/tasks'.
   * @param createTaskDto - DTO contendo os dados para criação da tarefa.
   * @returns A tarefa recém-criada.
   */
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.tasksService.create(createTaskDto);
  }

  /**
   * Rota para atualizar uma tarefa existente.
   * Mapeado para o método HTTP PUT em '/tasks/:id'.
   * @param id - ID da tarefa a ser atualizada (convertido para número via ParseIntPipe).
   * @param updateTaskDto - DTO contendo os dados para atualização da tarefa.
   * @returns A tarefa atualizada.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Rota para remover uma tarefa.
   * Mapeado para o método HTTP DELETE em '/tasks/:id'.
   * Retorna status 204 (No Content) em caso de sucesso.
   * @param id - ID da tarefa a ser removida (convertido para número via ParseIntPipe).
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }
}