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
  TodoId: string;
  Status: number;
}

export interface UpdateTodoPiority {
  TodoId: string;
  Priority: number;
}

export type GetTodosReponse = Array<Todo>;
