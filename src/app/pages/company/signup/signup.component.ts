import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { id } from '@swimlane/ngx-charts';
import { ActionDTO } from 'src/app/models/action.model';
import { Address } from 'src/app/models/address.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import Validation from 'src/app/validators/passoword-matcher.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  passwordMatch = false;
  companyName: string = '';
  userName: string = '';
  hide: boolean = true;
  isSubmitted: boolean = false;
  form: any;
  loading!: boolean;
  newCompany: Company;
  companyAddress: Address;
  companyService: CompanyService;
  fileName: string;
  companyId!: number;
  file!: any;
  isSmall!: boolean;

  constructor(
    companyService: CompanyService,
    private snackbar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog,
    public store: Store<{ breakpoint: Breakpoint }>
  ) {
    this.newCompany = {} as Company;
    this.companyAddress = {} as Address;
    this.companyService = companyService;
    this.fileName = 'No File Choosen';
    this.store.select('breakpoint').subscribe((change: Breakpoint) => {
      if (change.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      companyDescription: new FormControl(null, Validators.required),
      cin: new FormControl(null, [
        Validators.required,
        Validators.minLength(21),
        Validators.maxLength(21),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      icon: new FormControl(null, [Validators.required]),
      address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.minLength(6),
      ]),
      country: new FormControl(null, Validators.required),
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.form.patchValue({
      icon: this.file,
    });
  }

  onSubmit() {
    if (this.form.status === 'INVALID') return;
    this.newCompany.username = this.form.value.userName;
    this.newCompany.password = this.form.value.password;
    this.newCompany.companyDescription = this.form.value.companyDescription;
    this.newCompany.name = this.form.value.companyName;
    this.newCompany.cinNumber = this.form.value.cin;
    this.companyAddress.city = this.form.value.city;
    this.companyAddress.country = this.form.value.country;
    this.companyAddress.pincode = this.form.value.postalCode;
    this.companyAddress.state = this.form.value.state;
    this.companyAddress.streetNumber = this.form.value.address;
    this.companyAddress.street = this.form.value.address2;
    this.newCompany.address = this.companyAddress;

    this.loading = true;

    this.companyService.register(this.newCompany).subscribe(
      (data: any) => {
        this.companyId = data.companyId;
        const imageData = new FormData();
        imageData.append('companyIcon', this.file);
        this.companyService.addIcon(this.companyId, imageData).subscribe(() => {
          this.loading = false;
          this.router.navigate(['/']);
          this.snackbar.open('Sucessfully Submitted', 'Okay');
        });
      },
      (error: any) => {
        this.snackbar.open('Company Already Exists', 'Okay');
        this.loading = false;
      }
    );
  }
}
