import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  passwordFieldTypeText: boolean = false;
  confirmPasswordFieldTypeText: boolean = false;

  togglePasswordFieldType() {
    this.passwordFieldTypeText = !this.passwordFieldTypeText;
  }
  toggleConfirmPasswordFieldType() {
    this.confirmPasswordFieldTypeText = !this.confirmPasswordFieldTypeText;
  }
}
