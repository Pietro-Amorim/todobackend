export interface Task {
  id: string; // simplificado para string
  title: string;
  description: string;
  status: 'PENDING' | 'DONE';
}
