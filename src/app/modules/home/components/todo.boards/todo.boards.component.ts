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
  UpdateTodoPiority,
  UpdateTodoStatus,
} from '../../models/getTodosModel';
import { TodoService } from '../../services/todo.service';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditTodoModalComponent } from '../../modal/add-edit-todo.modal/add-edit-todo.modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadinServiceService } from 'src/app/modules/shared/services/loadingService/loadin.service.service';
import { ConfirmationModalComponent } from '../../modal/confirmation.modal/confirmation.modal.component';

@Component({
  selector: 'app-todo-boards',
  templateUrl: './todo.boards.component.html',
  styleUrls: ['./todo.boards.component.css'],
})
export class TodoBoardsComponent implements OnDestroy {
  public todoService = inject(TodoService);
  private notificationService = inject(NotificationService);
  private translocoService = inject(TranslocoService);
  private loadingService = inject(LoadinServiceService);
  readonly dialog = inject(MatDialog);
  @Input() todoTasks: GetTodosReponse = [];
  @Input() completedTasks: GetTodosReponse = [];
  @Input() blockedTasks: GetTodosReponse = [];
  @Output() todoUpdated = new EventEmitter<void>();

  dropSub: Subscription;
  updatePrioritySub: Subscription;

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
            this.todoUpdated.emit();
            this.notificationService.showSuccess(
              this.translocoService.translate('todo.updatedSuccessfully'),
              this.translocoService.translate('login.success')
            );
          },
          error: (err) => {
            this.notificationService.showError(
              this.translocoService.translate('register.anErrOccured'),
              this.translocoService.translate('login.error')
            );
          },
        });
    }
  }

  updatePriority(todoId: string, priority: number) {
    const todoToUpdatePriority: UpdateTodoPiority = {
      todoId: todoId,
      priority: priority,
    };
    this.updatePrioritySub = this.todoService
      .updateTodoPiority(todoToUpdatePriority)
      .subscribe({
        next: (response) => {
          this.loadingService.setLoading(false);
          this.todoUpdated.emit();
          this.notificationService.showSuccess(
            this.translocoService.translate('todo.updatedSuccessfully'),
            this.translocoService.translate('login.success')
          );
        },
        error: (err) => {
          this.loadingService.setLoading(false);
          this.notificationService.showError(
            this.translocoService.translate('register.anErrOccured'),
            this.translocoService.translate('login.error')
          );
        },
      });
  }

  deleteTodo(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { todoToDelete: todo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed) {
        this.deleteTodoAfterConfirmation(todo.todoId);
      }
    });
  }

  deleteTodoAfterConfirmation(todoId: string) {
    this.updatePrioritySub = this.todoService.deleteTodo(todoId).subscribe({
      next: (response) => {
        this.loadingService.setLoading(false);
        this.todoUpdated.emit();
        this.notificationService.showSuccess(
          this.translocoService.translate('todo.deletedSuccessfully'),
          this.translocoService.translate('login.success')
        );
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        this.notificationService.showError(
          this.translocoService.translate('register.anErrOccured'),
          this.translocoService.translate('login.error')
        );
      },
    });
  }

  openModal(isEditMode: boolean, todo?: Todo): void {
    const dialogRef = this.dialog.open(AddEditTodoModalComponent, {
      data: { isEditMode: isEditMode, todoToEdit: todo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.saved) {
        this.todoUpdated.emit();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dropSub) {
      this.dropSub.unsubscribe();
    }
    if (this.updatePrioritySub) {
      this.updatePrioritySub.unsubscribe();
    }
  }
}
