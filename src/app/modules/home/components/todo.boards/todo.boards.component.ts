import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { GetTodosReponse } from '../../models/getTodosModel';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-boards',
  templateUrl: './todo.boards.component.html',
  styleUrls: ['./todo.boards.component.css'],
})
export class TodoBoardsComponent {
  public todoService = inject(TodoService);

  todoTasks: GetTodosReponse = this.todoService.todos.filter(
    (obj: { Status: number }) => {
      return obj.Status === 1;
    }
  );

  completedTasks: GetTodosReponse = this.todoService.todos.filter(
    (obj: { Status: number }) => {
      return obj.Status === 2;
    }
  );

  blockedTasks: GetTodosReponse = this.todoService.todos.filter(
    (obj: { Status: number }) => {
      return obj.Status === 3;
    }
  );

  drop(event: CdkDragDrop<GetTodosReponse>) {
    // belolow are some info we get during the event
    const draggedItemData = event.item.data;
    const previousContainer = event.previousContainer;
    const newContainer = event.container;

    const id = +draggedItemData.id;
    const statusId = +newContainer.id;

    if (+previousContainer.id === +newContainer.id) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (+previousContainer.id !== +newContainer.id) {
      // this.isLoading = true;
    }
  }
}
