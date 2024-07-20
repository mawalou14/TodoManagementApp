import { Component, inject, OnInit } from '@angular/core';
import { LoadinServiceService } from '../../shared/services/loadingService/loadin.service.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private loadingService = inject(LoadinServiceService);
  loading: boolean = false;

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
