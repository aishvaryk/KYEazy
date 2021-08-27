import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedKycComponent } from './accepted-kyc.component';

describe('AcceptedKycComponent', () => {
  let component: AcceptedKycComponent;
  let fixture: ComponentFixture<AcceptedKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
