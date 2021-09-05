import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  rzp: any;
  pack!: string;
  amount!: string;
  coinBalance!: number;
  addCoinsText!: string;
  form!: FormGroup;
  pricePerCoin!: number;
  invalidForm: boolean = true;

  coinsToAdd!: number;
  planToActivate!: number;
  companyId!: number;
  orderHistory = [];
  displayedColumns: string[] = [];
  constructor(
    private paymentService: PaymentService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'amount',
      'companyOrderId',
      'orderId',
      'orderUniqueId',
      'paymentId',
    ];
    let k = localStorage.getItem('Id');
    if (k != null) {
      this.companyId = parseInt(k);
      this.companyService.getCompanyDetails(this.companyId);

      this.companyService.companySubject.subscribe((company) => {
        this.coinBalance = company.coins;
        this.options.prefill.name = company.name;
        this.planToActivate = company.plan;
      });
      this.paymentService.getOrderHistory(this.companyId);
      this.paymentService.orderHistory.subscribe((p) => {
        this.orderHistory = p;
      });
    }
    this.form = new FormGroup({
      coinsCount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
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
      color: '#3399cc',
    },
  };

  onKey(event: any) {
    if (this.form.status === 'VALID') {
      this.addCoinsText = 'Rs' + event.target.value;
      this.coinsToAdd = event.target.value;
      this.invalidForm = false;
    } else {
      this.addCoinsText = '';
      this.invalidForm = true;
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
  }
}
