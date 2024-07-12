import { Component, inject } from '@angular/core';
import { LoadinServiceService } from '../../shared/services/loadingService/loadin.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loadingService = inject(LoadinServiceService);
}
