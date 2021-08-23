import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  companyName:string = '';
  userName: string = '';
  hide:boolean = true;
  isSubmitted: boolean = false;
  form: any;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      companyDescription: new FormControl(null, Validators.required),
      cin: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if(this.form.status === "INVALID") return;
    console.log(this.form.value);
  }

}
