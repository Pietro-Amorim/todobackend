import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService], // registra o service
  exports: [TasksService],   // exporta se quiser usar em outros módulos
})
export class TasksModule {}
