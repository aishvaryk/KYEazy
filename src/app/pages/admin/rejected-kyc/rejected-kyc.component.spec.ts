import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedKycComponent } from './rejected-kyc.component';

describe('RejectedKycComponent', () => {
  let component: RejectedKycComponent;
  let fixture: ComponentFixture<RejectedKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
