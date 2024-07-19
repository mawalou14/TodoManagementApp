import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../models/getTodosModel';

@Component({
  selector: 'app-confirmation.modal',
  templateUrl: './confirmation.modal.component.html',
  styleUrls: ['./confirmation.modal.component.css'],
})
export class ConfirmationModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
  todoToDelete: Todo;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { todoToDelete: Todo }
  ) {
    this.todoToDelete = data.todoToDelete;
  }

  onConfirm(): void {
    this.dialogRef.close({ confirmed: true });
  }

  onCloseDialog(): void {
    this.dialogRef.close({ confirmed: false });
  }
}
