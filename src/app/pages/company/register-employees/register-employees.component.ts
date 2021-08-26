import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Documents } from 'src/app/models/documents.model';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-register-employees',
  templateUrl: './register-employees.component.html',
  styleUrls: ['./register-employees.component.scss']
})
export class RegisterEmployeesComponent implements OnInit {
  form: any;

  constructor(private companyService: CompanyService,public store: Store<{ documents: Documents }>) {

    this.form = new FormGroup({
      document: new FormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    let file = event.target.files[0];
    this.form.patchValue({
      document: file,
    });
  }

  onSave() {
    if(this.form.status === "INVALID") {
      console.log('if m');
      return;
    }
    console.log(this.form.get('document').value);

     const formData =  new FormData()
formData.append('employeeCSV',this.form.get('document').value);

    this.companyService.registerEmployees(formData,1);

  }


}
