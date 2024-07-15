import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { LoadinServiceService } from '../../services/loadingService/loadin.service.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private totalRequests = 0;
  private loadingService = inject(LoadinServiceService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    const token = this.authService.getToken();
    if (request.url.includes('auth')) {
      return next.handle(request);
    }
    if (token) {
      const reqAuth = request.clone({
        headers: request.headers.set(`Authorization`, `Bearer ${token}`),
      });
      return next.handle(reqAuth).pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
          }
        })
      );
    }
    return next.handle(request);
  }
}
