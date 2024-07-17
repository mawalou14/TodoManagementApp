import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, Input } from '@angular/core';
import { GetTodosReponse, Todo } from '../../models/getTodosModel';
import { TodoService } from '../../services/todo.service';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-todo-boards',
  templateUrl: './todo.boards.component.html',
  styleUrls: ['./todo.boards.component.css'],
})
export class TodoBoardsComponent {
  public todoService = inject(TodoService);
  @Input() todoTasks: GetTodosReponse = [];
  @Input() completedTasks: GetTodosReponse = [];
  @Input() blockedTasks: GetTodosReponse = [];

  trackByTodoId(index: number, todo: Todo): string {
    return todo.todoId;
  }

  getDateFormat() {
    const currentLanguage = localStorage.getItem('selectedLanguage');
    return currentLanguage === 'en' ? 'M/d/yy' : 'dd/MM/yyyy';
  }

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
