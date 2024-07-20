import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadinServiceService } from '../../services/loadingService/loadin.service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadService = inject(LoadinServiceService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadService.showLoader();

    return next
      .handle(request)
      .pipe(finalize(() => this.loadService.hideLoader()));
  }
}
