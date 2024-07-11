import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LoginForm } from '../../models/login';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { TranslocoService } from '@jsverse/transloco';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  passwordFieldTypeText: boolean = false;
  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private translocoService = inject(TranslocoService);
  loginSubscription!: Subscription;

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email]],
    password: [
      '',
      [
        Validators.minLength(6),
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
        this.notificationService.showSuccess(
          this.translocoService.translate('login.loginSuccess'),
          this.translocoService.translate('login.success')
        );
      },
      error: (err) => {
        // console.log(err.error.message);
        this.notificationService.showError(
          this.translocoService.translate('login.InvalidCredentials'),
          this.translocoService.translate('login.error')
        );
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
