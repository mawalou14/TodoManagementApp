import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-todo.modal',
  templateUrl: './add-edit-todo.modal.component.html',
  styleUrls: ['./add-edit-todo.modal.component.css'],
})
export class AddEditTodoModalComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditTodoModalComponent>);

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
