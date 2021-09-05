import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public dialog:MatDialog) {}

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
        employeeId: this.employee.employeeId
      },
    });
  }
}
