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

  todos: GetTodosReponse = [
    {
      TodoId: '1',
      Description: 'Buy groceries',
      TargetedTime: new Date('2024-07-10T10:00:00'),
      Priority: 1,
      Status: 1,
      CreatedAt: new Date('2024-07-01T08:00:00'),
      UserId: 'user1',
    },
    {
      TodoId: '2',
      Description: 'Meeting with team',
      TargetedTime: new Date('2024-07-11T14:00:00'),
      Priority: 2,
      Status: 2,
      CreatedAt: new Date('2024-07-01T09:00:00'),
      UserId: 'user2',
    },
    {
      TodoId: '3',
      Description: 'Dentist appointment',
      TargetedTime: new Date('2024-07-12T16:00:00'),
      Priority: 3,
      Status: 3,
      CreatedAt: new Date('2024-07-01T10:00:00'),
      UserId: 'user3',
    },
    {
      TodoId: '4',
      Description: 'Finish report',
      TargetedTime: new Date('2024-07-13T12:00:00'),
      Priority: 2,
      Status: 1,
      CreatedAt: new Date('2024-07-01T11:00:00'),
      UserId: 'user4',
    },
    {
      TodoId: '5',
      Description: 'Call client',
      TargetedTime: new Date('2024-07-14T09:00:00'),
      Priority: 1,
      Status: 2,
      CreatedAt: new Date('2024-07-01T12:00:00'),
      UserId: 'user5',
    },
    {
      TodoId: '6',
      Description: 'Renew car insurance',
      TargetedTime: new Date('2024-07-15T11:00:00'),
      Priority: 2,
      Status: 3,
      CreatedAt: new Date('2024-07-01T13:00:00'),
      UserId: 'user6',
    },
    {
      TodoId: '7',
      Description: 'Plan vacation',
      TargetedTime: new Date('2024-07-16T17:00:00'),
      Priority: 3,
      Status: 1,
      CreatedAt: new Date('2024-07-01T14:00:00'),
      UserId: 'user7',
    },
    {
      TodoId: '8',
      Description: 'Submit assignment',
      TargetedTime: new Date('2024-07-17T18:00:00'),
      Priority: 1,
      Status: 2,
      CreatedAt: new Date('2024-07-01T15:00:00'),
      UserId: 'user8',
    },
    {
      TodoId: '9',
      Description: 'Workout session',
      TargetedTime: new Date('2024-07-18T07:00:00'),
      Priority: 2,
      Status: 2,
      CreatedAt: new Date('2024-07-01T16:00:00'),
      UserId: 'user9',
    },
    {
      TodoId: '10',
      Description: 'Grocery shopping',
      TargetedTime: new Date('2024-07-19T13:00:00'),
      Priority: 3,
      Status: 1,
      CreatedAt: new Date('2024-07-01T17:00:00'),
      UserId: 'user10',
    },
    {
      TodoId: '11',
      Description: 'Grocery shopping',
      TargetedTime: new Date('2024-07-19T13:00:00'),
      Priority: 3,
      Status: 1,
      CreatedAt: new Date('2024-07-01T17:00:00'),
      UserId: 'user10',
    },
  ];

  getUsersTodo(): Observable<GetTodosReponse> {
    return this.httpClient
      .get<GetTodosReponse>(`${this.url}`)
      .pipe(tap((response) => {}));
  }

  updateTodo(todoToUpdate: Todo): Observable<any> {
    return this.httpClient.put<any>(`${this.url}`, todoToUpdate);
  }
}
