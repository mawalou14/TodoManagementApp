import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { TokenInterceptorInterceptor } from './modules/shared/interceptors/Token/token.interceptor.interceptor';
import { LoadingInterceptorInterceptor } from './modules/shared/interceptors/Loading/loading.interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { GeneralLoadingComponent } from './modules/shared/components/general-loading/general-loading.component';

@NgModule({
  declarations: [AppComponent, GeneralLoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    TranslocoRootModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      autoDismiss: true,
      timeOut: 5000,
      closeButton: true,
      extendedTimeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
      newestOnTop: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
