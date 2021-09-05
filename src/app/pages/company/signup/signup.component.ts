import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import { ActionDTO } from 'src/app/models/action.model';
import { Address } from 'src/app/models/address.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

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

  constructor(
    companyService: CompanyService,
    private snackbar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.newCompany = {} as Company;
    this.companyAddress = {} as Address;
    this.companyService = companyService;
    this.fileName = "No File Choosen"
  }

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
      country: new FormControl(null, Validators.required),
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
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
      (data: ActionDTO) => {
        this.companyId = data.id;
        this.snackbar.open('Sucessfully Submitted', 'Okay');
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.snackbar.open('Company Already Exists', 'Okay');
      }
    );

    const imageData = new FormData();
    imageData.append('companyIcon', this.file);
    this.companyService.uploadIcon(this.companyId,this.file).subscribe(() => {
      this.loading = false;
    });

  }
}
