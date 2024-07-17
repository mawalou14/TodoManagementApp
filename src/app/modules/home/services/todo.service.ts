import { UpdateTodoPiority } from './../models/getTodosModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import {
  GetTodosReponse,
  Todo,
  UpdateTodoStatus,
} from '../models/getTodosModel';
import { AuthResponse } from '../../auth/models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = environment.baseUrl + '/Todo';
  constructor(private httpClient: HttpClient) {}

  todos: GetTodosReponse = [
    {
      todoId: '1',
      description: 'Buy groceries',
      targetedTime: new Date('2024-07-10T10:00:00'),
      priority: 1,
      status: 1,
      createdAt: new Date('2024-07-01T08:00:00'),
      userId: 'user1',
    },
  ];

  getuserId(): string | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: AuthResponse = JSON.parse(storedUser);
      return user.user.userId;
    }
    return null;
  }

  getUsersTodo(userId: string): Observable<GetTodosReponse> {
    return this.httpClient.get<GetTodosReponse>(`${this.url}/user/` + userId);
  }

  updateTodo(todoToUpdate: Todo): Observable<any> {
    return this.httpClient.put<any>(`${this.url}`, todoToUpdate);
  }

  updateTodoStatus(todoToUpdateStatus: UpdateTodoStatus): Observable<string> {
    return this.httpClient.patch<string>(
      `${this.url}/update-status`,
      todoToUpdateStatus,
      { responseType: 'text' as 'json' }
    );
  }

  updateTodoPiority(
    todoToUpdatePriority: UpdateTodoPiority
  ): Observable<string> {
    return this.httpClient.patch<any>(
      `${this.url}/update-priority`,
      todoToUpdatePriority,
      { responseType: 'text' as 'json' }
    );
  }

  deleteTodo(todoToDeleteId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/delete/` + todoToDeleteId, {
      responseType: 'text' as 'json',
    });
  }
}
