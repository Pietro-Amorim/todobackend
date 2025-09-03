// src/tasks/entities/product.entity.ts
import { stat } from 'fs';
import { type } from 'os';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// src/tasks/entities/tasks.entity.ts

export class TaskEntity {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'DONE';
}

@Entity({ name: 'tasks' }) // Mapeia para uma tabela chamada 'tasks'
export class ProductEntity {
  @PrimaryGeneratedColumn() // Define como chave primária com auto-incremento
  id: string;

  @Column({ length: 100 }) // Define uma coluna do tipo string (varchar)
  title: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Define uma coluna decimal para preços
  descripition: string;

  @Column({ type: 'enum', enum: ['PENDING', 'DONE'], default: 'PENDING' })
  status: string;
}