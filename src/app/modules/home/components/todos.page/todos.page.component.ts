import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { GetTodosReponse } from '../../models/getTodosModel';

@Component({
  selector: 'app-todos.page',
  templateUrl: './todos.page.component.html',
  styleUrls: ['./todos.page.component.css'],
})
export class TodosPageComponent implements OnInit {
  public todoService = inject(TodoService);
  todoTasks: GetTodosReponse = [];
  completedTasks: GetTodosReponse = [];
  blockedTasks: GetTodosReponse = [];

  ngOnInit(): void {
    const userId: string = this.todoService.getuserId();
    this.todoService.getUsersTodo(userId).subscribe((response) => {
      this.todoTasks = response.filter((todo) => todo.status === 1);
      this.completedTasks = response.filter((todo) => todo.status === 2);
      this.blockedTasks = response.filter((todo) => todo.status === 3);
    });
  }
}
