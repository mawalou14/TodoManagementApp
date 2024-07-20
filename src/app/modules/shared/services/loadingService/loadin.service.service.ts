import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadinServiceService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showLoader() {
    this.loadingSub.next(true);
  }

  hideLoader() {
    this.loadingSub.next(false);
  }
}
