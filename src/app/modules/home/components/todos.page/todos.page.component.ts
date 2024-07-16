import { TranslocoService } from '@jsverse/transloco';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadinServiceService } from 'src/app/modules/shared/services/loadingService/loadin.service.service';
import { TodoService } from '../../services/todo.service';
import { GetTodosReponse, Todo } from '../../models/getTodosModel';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todos.page',
  templateUrl: './todos.page.component.html',
  styleUrls: ['./todos.page.component.css'],
})
export class TodosPageComponent {
  public todoService = inject(TodoService);
  readonly panelOpenState = signal(false);

  todoTasks: GetTodosReponse = this.todoService.todos.filter(
    (obj: { Status: number }) => {
      return obj.Status === 1;
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
