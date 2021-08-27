import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivelinessComponent } from './liveliness.component';

describe('LivelinessComponent', () => {
  let component: LivelinessComponent;
  let fixture: ComponentFixture<LivelinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivelinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivelinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
