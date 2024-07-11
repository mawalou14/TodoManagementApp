import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LoginForm } from '../../models/login';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  passwordFieldTypeText: boolean = false;
  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  loginSubscription!: Subscription;

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,20}$'),
      ],
    ],
  });

  togglePasswordFieldType() {
    this.passwordFieldTypeText = !this.passwordFieldTypeText;
  }

  login() {
    const loginValue: LoginForm = this.loginForm.value as LoginForm;
    this.loginSubscription = this.authService.login(loginValue).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Success', 'Login Successfull');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
