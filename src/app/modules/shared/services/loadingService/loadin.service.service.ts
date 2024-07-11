import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadinServiceService {
  #showLoader = false;

  showLoader() {
    this.#showLoader = true;
  }

  hideLoader() {
    this.#showLoader = false;
  }

  get isLoading() {
    return this.#showLoader;
  }
}
