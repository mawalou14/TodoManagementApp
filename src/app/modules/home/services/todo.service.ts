import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { GetTodosReponse, Todo } from '../models/getTodosModel';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  todos: GetTodosReponse = [];

  getUsersTodo(): Observable<GetTodosReponse> {
    return this.httpClient
      .get<GetTodosReponse>(`${this.url}`)
      .pipe(tap((response) => {}));
  }

  updateTodo(todoToUpdate: Todo): Observable<any> {
    return this.httpClient.put<any>(`${this.url}`, todoToUpdate);
  }
}
