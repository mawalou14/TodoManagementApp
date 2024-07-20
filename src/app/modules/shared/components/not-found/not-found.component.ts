import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { LoadinServiceService } from '../../services/loadingService/loadin.service.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  private authService = inject(AuthService);
  private loadingService = inject(LoadinServiceService);
  private router = inject(Router);
  loading: boolean = false;

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }

  onMoveToAuthModule(route: string): void {
    this.loadingService.showLoader();
    setTimeout(() => {
      this.loadingService.hideLoader();
      this.authService.logout();
      this.router.navigate([`/${route}`]);
    }, 1000);
  }
}
