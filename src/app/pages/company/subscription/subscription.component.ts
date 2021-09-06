import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  rzp:any;
  pack!:string
  amount!:string
  coinBalance!:number

  constructor(private paymentService:PaymentService,private companyService:CompanyService) { }

  ngOnInit(): void {
    let k=localStorage.getItem("Id");
    if(k!=null) this.companyService.getCompanyDetails(parseInt(k));
    this.companyService.companySubject.subscribe((company)=>{
      this.coinBalance=company.coins;
    })

  }
  options = {
    "key": "rzp_test_51mlvZBHt5Cbjq", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Kyeazzy",
    "description": "Subscription",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler":  (response:any)=>{
      console.log(response);
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
  pay(coins:any)
  {
    let amount=200*coins;
    this.options.amount=amount.toString();
    this.options.prefill={
      "name": "Riya Punjabi",
      "email": "riyapunjabi16092000@gmail.com",
      "contact": "9098679391"
  };
    this.paymentService.getOrderId(this.options.amount);
    this.paymentService.orderSubject.subscribe((orderId)=>{this.options.order_id=orderId})
    this.rzp = new this.paymentService.nativeWindow.Razorpay(this.options);
    this.rzp.open();
  }

}
