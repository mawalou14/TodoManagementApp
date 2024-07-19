import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateTodo, Todo, UpdateTodo } from '../../models/getTodosModel';
import { TodoService } from '../../services/todo.service';
import { LoadinServiceService } from 'src/app/modules/shared/services/loadingService/loadin.service.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-add-edit-todo.modal',
  templateUrl: './add-edit-todo.modal.component.html',
  styleUrls: ['./add-edit-todo.modal.component.css'],
})
export class AddEditTodoModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddEditTodoModalComponent>);
  private formBuilder = inject(NonNullableFormBuilder);
  private todoService = inject(TodoService);
  private notificationService = inject(NotificationService);
  private translocoService = inject(TranslocoService);
  public isLoading = false;
  minDate = new Date();
  isEditMode: boolean;
  todoToEdit: Todo;
  title: string;

  public todoForm = this.formBuilder.group({
    description: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    priority: ['0', Validators.required],
    targetedTime: [
      '',
      [Validators.required, this.minDateValidator(new Date())],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { isEditMode: boolean; todoToEdit: Todo; modalTitle: string }
  ) {
    this.isEditMode = data.isEditMode;
    this.todoToEdit = data.todoToEdit;
    this.title = data.modalTitle;
  }

  ngOnInit(): void {
    if (this.isEditMode && this.todoToEdit !== undefined) {
      this.updateForm(this.todoToEdit);
    }
  }

  updateForm(todoToEdit: Todo): void {
    this.todoForm.patchValue({
      description: todoToEdit.description,
      priority: todoToEdit.priority.toString(),
      targetedTime: new Date(todoToEdit.targetedTime).toISOString(),
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close({ saved: false });
  }

  onSubmitForm() {
    this.isLoading = true;
    if (this.todoForm.valid) {
      const userId = this.todoService.getuserId();
      const { description, targetedTime, priority } = this.todoForm.value;
      const isoTargetedTime = new Date(targetedTime).toISOString();
      if (!this.isEditMode) {
        const status = 1;
        const newTodo: CreateTodo = {
          description: description as string,
          targetedTime: isoTargetedTime,
          priority: +priority as number,
          status,
          userId,
        };
        this.todoService.create(newTodo).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.notificationService.showSuccess(
              this.translocoService.translate('todo.createdSuccessfully'),
              this.translocoService.translate('login.success')
            );
            this.dialogRef.close({ saved: true });
          },
          error: (err) => {
            this.isLoading = false;
            this.notificationService.showError(
              this.translocoService.translate('register.anErrOccured'),
              this.translocoService.translate('login.error')
            );
          },
        });
      } else {
        const todoToUpdate: UpdateTodo = {
          description: description as string,
          targetedTime: isoTargetedTime,
          priority: +priority as number,
          status: this.todoToEdit.status,
          todoId: this.todoToEdit.todoId,
        };
        this.todoService.updateTodo(todoToUpdate).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.notificationService.showSuccess(
              this.translocoService.translate('todo.updatedSuccessfully'),
              this.translocoService.translate('login.success')
            );
            this.dialogRef.close({ saved: true });
          },
          error: (err) => {
            this.isLoading = false;
            this.notificationService.showError(
              this.translocoService.translate('register.anErrOccured'),
              this.translocoService.translate('login.error')
            );
          },
        });
      }
    }
  }

  private minDateValidator(minDate: Date) {
    return (control: AbstractControl) => {
      const controlDate = new Date(control.value);
      if (control.value && controlDate < minDate) {
        return { minDate: { value: control.value, minDate: minDate } };
      }
      return null;
    };
  }
}
