import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  GetTodosReponse,
  Todo,
  UpdateTodoStatus,
} from '../../models/getTodosModel';
import { TodoService } from '../../services/todo.service';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';

@Component({
  selector: 'app-todo-boards',
  templateUrl: './todo.boards.component.html',
  styleUrls: ['./todo.boards.component.css'],
})
export class TodoBoardsComponent implements OnDestroy {
  public todoService = inject(TodoService);
  private notificationService = inject(NotificationService);
  @Input() todoTasks: GetTodosReponse = [];
  @Input() completedTasks: GetTodosReponse = [];
  @Input() blockedTasks: GetTodosReponse = [];
  @Output() todoStatusUpdated = new EventEmitter<void>();

  dropSub: Subscription;

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

    const draggedTodoId = draggedItemData.todoId;
    const newStatus = +newContainer.id;

    if (+previousContainer.id === +newContainer.id) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (+previousContainer.id !== +newContainer.id) {
      const todoToUpdateStatus: UpdateTodoStatus = {
        todoId: draggedTodoId,
        status: newStatus,
      };

      this.dropSub = this.todoService
        .updateTodoStatus(todoToUpdateStatus)
        .subscribe({
          next: (response) => {
            this.todoStatusUpdated.emit();
            this.notificationService.showSuccess(
              'Successfully updated',
              'Success'
            );
          },
          error: (err) => {
            this.notificationService.showError('An Error Occured', 'Error');
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.dropSub) {
      this.dropSub.unsubscribe();
    }
  }
}
