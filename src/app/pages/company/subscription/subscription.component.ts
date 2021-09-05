import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  rzp:any;
  pack!:string;
  amount!:string;
  coinBalance!:number;
  coinsToAdd!:number;
  planToActivate!:number;
  companyId!:number;
  orderHistory=[]
  constructor(private paymentService:PaymentService,private companyService:CompanyService) { }

  ngOnInit(): void {
    let k=localStorage.getItem("Id");
    console.log(k)
    if(k!=null)
    {
    this.companyId=parseInt(k);
      console.log(this.companyId)
    this.companyService.getCompanyDetails(this.companyId);
    }
    this.companyService.companySubject.subscribe((company)=>{
    //  this.companyId=company.companyId;
      this.coinBalance=company.coins;
      this.options.prefill.name=company.name;
      this.planToActivate=company.plan;
      //this.options.prefill.contact=company.;
    })
    this.paymentService.getOrderHistory(this.companyId)
    this.paymentService.orderHistory.subscribe((p)=>{
      console.log(p)
      this.orderHistory=p;

    })
}
  setCoins(event:any)
  {
    this.coinsToAdd=event.target.value
  }

  options = {
    "key": "rzp_test_51mlvZBHt5Cbjq",
    "amount": "",
    "currency": "INR",
    "name": "Kyeazzy",
    "description": "Subscription",
    "image": "https://example.com/your_logo",
    "order_id": "",
    "handler":  (response:any)=>{
         alert(response.razorpay_payment_id);
          console.log(response)
          console.log(this.coinsToAdd)
        this.paymentService.paymentSuccess(this.companyId,this.coinsToAdd,response.razorpay_payment_id,this.options.order_id)

      },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        //"contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
  pay()
  {
    console.log(this.planToActivate)
    console.log(this.coinsToAdd)
    let amount=this.planToActivate*this.coinsToAdd*100;

    this.options.amount=amount.toString();

    this.paymentService.getOrderId(this.options.amount);
    this.paymentService.orderSubject.subscribe((orderId)=>{this.options.order_id=orderId})
    this.rzp = new this.paymentService.nativeWindow.Razorpay(this.options);
    this.rzp.open();
  }


}
