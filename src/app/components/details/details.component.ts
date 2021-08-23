import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  firstName:string = '';
  lastName: string = '';
  isSubmitted: boolean = false;

  form: any;

  constructor() {
    // this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required), // this will be auto filled
      lastName: new FormControl(null, Validators.required), // this will be auto filled
      gender: new FormControl(false, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]), // this will be auto filled
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    });

    console.log(this.form);
  }

  onNext() {
    console.log(this.form);
  }

  public errorHandling = (control: string, error: string) => {

    // return this.form.controls[control].hasError(error);
    // return this.form.controls[control].errors?.required;
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.controls['email'].hasError('errors') ?  '' : 'Not a valid email';
  }


}
