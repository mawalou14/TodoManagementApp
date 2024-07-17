export interface Todo {
  todoId: string; // Match this with the property in the response
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
