import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { CompanyService } from 'src/app/services/company/company.service';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: any;
  @Input() isSmall: any;
  @Input() user: any;

  @Output() rekyc = new EventEmitter<number>();

  constructor(
    public companyService: CompanyService,
    public store: Store<{ breakpoint: Breakpoint }>,
    public dialog: MatDialog
  ) {
    this.store.select('breakpoint').subscribe((change: Breakpoint) => {
      if (change.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });
  }

  ngOnInit(): void {}

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  OnReport() {
    this.dialog.open(ModalComponent, {
      data: {
        type: 'REPORT',
        employeeId: this.employee.employeeId,
      },
    });
  }

  onReKyc() {
    this.rekyc.emit(this.employee.employeeId);
  }
}
