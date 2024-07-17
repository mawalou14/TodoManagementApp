import { ResolveFn } from '@angular/router';
import { GetTodosReponse } from '../models/getTodosModel';
import { inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

export const todoResolver: ResolveFn<GetTodosReponse> = (route, state) => {
  const todoService = inject(TodoService);
  const userId = todoService.getuserId();
  return todoService.getUsersTodo(userId);
};
