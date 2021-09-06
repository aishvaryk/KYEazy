import { Component, Input, OnInit } from '@angular/core';
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

  companyId!:number;
  form!: FormGroup;
  planToActivate:any;
  coinsToAdd:number=0;
  invalidForm!:boolean;
  rzp:any;
  employeesAddable:number=0;
  perEmployeePrice:number=10;


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
        this.planToActivate = company.plan;
      });
      this.paymentService.getOrderHistory(this.companyId);
    }
  }

  options = {
    key: 'rzp_test_51mlvZBHt5Cbjq',
    amount: '',
    currency: 'INR',
    name: 'KYEazy',
    description: 'Buy Coins',
    image: '/assets/images/logo.png',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: (response: any) => {
      alert(response.razorpay_payment_id);
      this.paymentService
        .paymentSuccess(
          this.companyId,
          this.coinsToAdd,
          response.razorpay_payment_id,
          this.options.order_id
        )
        .subscribe((response: any) => {
          this.companyService.getCompanyDetails(this.companyId);
          this.paymentService.getOrderHistory(this.companyId);
        });
    },
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      //"contact": "9999999999"
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
      this.employeesAddable = Math.floor(this.coinsToAdd/this.perEmployeePrice)
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
      this.coinsToAdd = 0;
    }
  }

  onSubmit() {
    let amount = this.planToActivate * this.coinsToAdd * 100;

    this.options.amount = amount.toString();

    this.paymentService.getOrderId(this.options.amount);
    this.paymentService.orderSubject.subscribe((orderId) => {
      this.options.order_id = orderId;
    });
    this.rzp = new this.paymentService.nativeWindow.Razorpay(this.options);
    this.rzp.open();

    this.bottomSheet.dismiss();
  }

}
