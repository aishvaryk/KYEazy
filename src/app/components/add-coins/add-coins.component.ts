import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';


@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.scss']
})
export class AddCoinsComponent implements OnInit {

  amount:number=0;
  companyId!:number;
  form!: FormGroup;
  planToActivate:any;
  coinsToAdd:number=0;
  invalidForm!:boolean;
  rzp:any;
  employeesAddable:number=0;
  perEmployeePrice:number=0;
  numberOfEmployees=0;

  constructor(private companyService:CompanyService, private paymentService:PaymentService,
    public bottomSheet:MatBottomSheetRef<AddCoinsComponent>) {
    this.form = new FormGroup({
      coinsCount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  ngOnInit(): void {

    let k = localStorage.getItem('Id');
    if (k != null) {
      this.companyId = parseInt(k);
      this.companyService.getCompanyDetails(this.companyId);

      this.companyService.companySubject.subscribe((company) => {
        this.options.prefill.name = company.name;
        this.numberOfEmployees=company.numberOfTotalEmployees;
        if(company.numberOfTotalEmployees>10000) this.planToActivate=10;
        if(company.numberOfTotalEmployees>100 && company.numberOfTotalEmployees<=1000) this.planToActivate=8;
        if(company.numberOfTotalEmployees>1000) this.planToActivate=6;
        if(company.numberOfTotalEmployees<100) this.planToActivate=4;

      });

    }
  }


  options = {

    key: 'rzp_test_51mlvZBHt5Cbjq',
    amount: '',
    currency: 'INR',
    name: 'KYEazy',
    description: 'Buy Coins',
    image: '/assets/images/logo.png',
    order_id: '',

    handler: (response: any) => {
      this.paymentService
        .paymentSuccess(
          this.companyId,
          this.coinsToAdd,

          response.razorpay_payment_id,
          this.options.order_id,
          this.amount
        )
        .subscribe((response: any) => {

          this.companyService.getCompanyDetails(this.companyId);
          this.paymentService.getOrderHistory(this.companyId);
        });

    },

    prefill: {
      name: '',
      email: '',
      contact: ""
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#008080',
    },
  };

  onKey(event: any) {

    if (this.form.status === 'VALID') {
      this.coinsToAdd = Math.floor(event.target.value);
      this.employeesAddable = this.numberOfEmployees;
      this.amount = this.planToActivate * this.coinsToAdd ;
      this.invalidForm = false;
    }
    else {
      this.invalidForm = true;
      this.coinsToAdd = 0;
    }
  }

  onSubmit() {
    let amount = this.amount * 100;

    this.options.amount = amount.toString();

    this.paymentService.getOrderId(this.options.amount);

    this.paymentService.orderSubject.subscribe((orderId) => {
      this.options.order_id = orderId;

      this.rzp = new this.paymentService.nativeWindow.Razorpay(this.options);
      this.rzp.open();

    this.bottomSheet.dismiss();

    });


  }

}
