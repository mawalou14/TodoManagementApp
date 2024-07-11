import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (request.url.includes('auth')) {
      return next.handle(request);
    }
    if (token) {
      const reqAuth = request.clone({
        headers: request.headers.set(`Authorization`, `Bearer ${token}`),
      });
      return next.handle(reqAuth);
    }
    return next.handle(request);
  }
}
