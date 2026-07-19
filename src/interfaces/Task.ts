// src/interfaces/Task.ts
export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  priority: 'düşük' | 'orta' | 'yüksek';
  deadline?: string;
}