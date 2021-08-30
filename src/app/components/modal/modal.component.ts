import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: string,
      error:string,
    },
    public dialog: MatDialogRef<ModalComponent>
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onClose(): void {
    this.dialog.close();
  }

}

