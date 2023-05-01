import { TestBed } from '@angular/core/testing';

import { ComplateProfileGuard } from './complate-profile.guard';

describe('ComplateProfileGuard', () => {
  let guard: ComplateProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComplateProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
