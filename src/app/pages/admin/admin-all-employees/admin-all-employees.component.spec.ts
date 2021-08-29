import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllEmployeesComponent } from './admin-all-employees.component';

describe('AdminAllEmployeesComponent', () => {
  let component: AdminAllEmployeesComponent;
  let fixture: ComponentFixture<AdminAllEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
