import { TestBed } from '@angular/core/testing';

import { CompanyGuard } from './company.guard';

describe('AuthGuard', () => {
  let guard: CompanyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
