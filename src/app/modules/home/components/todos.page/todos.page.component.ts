import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { GetTodosReponse, Todo } from '../../models/getTodosModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos.page',
  templateUrl: './todos.page.component.html',
  styleUrls: ['./todos.page.component.css'],
})
export class TodosPageComponent implements OnInit {
  public todoService = inject(TodoService);
  private route = inject(ActivatedRoute);
  todoTasks: GetTodosReponse = [];
  completedTasks: GetTodosReponse = [];
  blockedTasks: GetTodosReponse = [];

  ngOnInit(): void {
    this.route.data.subscribe(({ userTodos }) => {
      this.todoTasks = userTodos.filter((todo: Todo) => todo.status === 1);
      this.completedTasks = userTodos.filter((todo: Todo) => todo.status === 2);
      this.blockedTasks = userTodos.filter((todo: Todo) => todo.status === 3);
    });
  }
}
