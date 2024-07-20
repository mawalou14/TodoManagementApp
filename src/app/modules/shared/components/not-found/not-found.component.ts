import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { LoadinServiceService } from '../../services/loadingService/loadin.service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onMoveToAuthModule(route: string): void {
    // this.loadingService.setLoading(true);
    setTimeout(() => {
      // this.loadingService.setLoading(false);
      this.authService.logout();
      this.router.navigate([`/${route}`]);
    }, 1000);
  }
}
