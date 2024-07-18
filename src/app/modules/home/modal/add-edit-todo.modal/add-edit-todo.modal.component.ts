import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-todo.modal',
  templateUrl: './add-edit-todo.modal.component.html',
  styleUrls: ['./add-edit-todo.modal.component.css'],
})
export class AddEditTodoModalComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditTodoModalComponent>);
  private formBuilder = inject(NonNullableFormBuilder);

  minDate = new Date();

  public todoForm = this.formBuilder.group({
    description: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    priority: ['0', Validators.required],
    targetedTime: ['', Validators.required],
  });

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmitForm() {}
}
