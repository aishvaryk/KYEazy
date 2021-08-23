import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  isSubmitted: boolean = false;
  form: any;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(false, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    });

  }

  onNext() {
    console.log(this.form);
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls['email'].hasError('errors') ?  '' : 'Not a valid email';
  }

}
