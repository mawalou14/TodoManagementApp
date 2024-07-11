import { Component, inject, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { AuthService } from '../../services/auth.service';
import { RegisterForm } from '../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private translocoService = inject(TranslocoService);
  registerSubscription!: Subscription;
  passwordFieldTypeText: boolean = false;
  confirmPasswordFieldTypeText: boolean = false;

  togglePasswordFieldType() {
    this.passwordFieldTypeText = !this.passwordFieldTypeText;
  }
  toggleConfirmPasswordFieldType() {
    this.confirmPasswordFieldTypeText = !this.confirmPasswordFieldTypeText;
  }

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.email]],
    password: [
      '',
      [
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,20}$'),
      ],
    ],
    fullName: ['', [Validators.required]],
    confirmPassword: [
      '',
      [
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,20}$'),
      ],
    ],
  });

  register() {
    if (this.registerForm.valid) {
      const registerValue: RegisterForm = this.registerForm
        .value as unknown as RegisterForm;
      this.registerSubscription = this.authService
        .register(registerValue)
        .subscribe({
          next: (response) => {
            this.notificationService.showSuccess(
              this.translocoService.translate('register.registerSuccess'),
              this.translocoService.translate('login.success')
            );
          },
          error: (err) => {
            // console.log(err.error.message);
            this.notificationService.showError(
              this.translocoService.translate('register.anErrOccured'),
              this.translocoService.translate('login.error')
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
