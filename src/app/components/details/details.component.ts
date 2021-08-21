import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form: FormGroup

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(''), // this will be auto filled
      lastName: new FormControl(''), // this will be auto filled
      gender: new FormControl(false),
      contact: new FormControl(''),
      email: new FormControl(''), // this will be auto filled
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
    });
  }



}
