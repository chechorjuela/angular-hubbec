import { TestBed } from '@angular/core/testing';

import { ValidTimerInterceptor } from './valid-timer.interceptor';

describe('ValidTimerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ValidTimerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ValidTimerInterceptor = TestBed.inject(ValidTimerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
