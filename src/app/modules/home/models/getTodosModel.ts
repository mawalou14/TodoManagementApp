export interface Todo {
  TodoId?: string;
  Description?: string;
  TargetedTime?: Date;
  Priority?: number;
  Status?: number;
  CreatedAt?: Date;
  UserId?: string;
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
