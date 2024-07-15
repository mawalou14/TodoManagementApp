import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadinServiceService {
  private loading = false;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  stopLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
