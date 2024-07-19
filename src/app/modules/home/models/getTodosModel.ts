export interface Todo {
  todoId: string;
  description: string;
  targetedTime: Date;
  priority: number;
  status: number;
  createdAt?: Date;
  userId?: string;
}

export interface UpdateTodoStatus {
  todoId: string;
  status: number;
}

export interface UpdateTodoPiority {
  todoId: string;
  priority: number;
}

export type GetTodosReponse = Array<Todo>;

export interface CreateTodo {
  description: string;
  targetedTime: string;
  priority: number;
  status?: number;
  userId?: string;
}

export interface UpdateTodo {
  description: string;
  targetedTime: string;
  priority: number;
  status?: number;
  todoId?: string;
}
