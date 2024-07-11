import { TestBed } from '@angular/core/testing';

import { HostInterceptorInterceptor } from './host.interceptor.interceptor';

describe('HostInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HostInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HostInterceptorInterceptor = TestBed.inject(HostInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
