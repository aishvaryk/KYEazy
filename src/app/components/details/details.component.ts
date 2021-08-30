import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Details } from 'src/app/models/details.model';
import { setDetails } from 'src/app/redux/actions/details.action';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  form: any;

  constructor(public store: Store<{ details: Details }>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl("m", Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    });
  }

  onSave() {
    let details = {} as Details;
    details.firstName = this.form.value.firstName;
    details.lastName = this.form.value.lastName;
    details.gender = this.form.value.gender;
    details.addressLine1 = this.form.value.addressLine1;
    details.addressLine2 = this.form.value.addressLine2;
    details.city = this.form.value.city;
    details.contact = this.form.value.contact;
    details.state = this.form.value.state;
    details.country = this.form.value.country;
    details.email=this.form.value.email;
    this.store.dispatch(setDetails(details));
  }

}
