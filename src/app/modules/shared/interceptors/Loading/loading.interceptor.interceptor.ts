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
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  private loadingService = inject(LoadinServiceService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('X-LOADING') === 'false') {
      return next.handle(request);
    }
    this.loadingService.showLoader();
    return next
      .handle(request)
      .pipe(finalize(() => this.loadingService.hideLoader()));
  }
}
