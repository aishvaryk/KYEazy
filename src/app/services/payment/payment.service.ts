import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


function _window()
{
  return window
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

orderId!:any
orderSubject:Subject<any>=new Subject();
  get nativeWindow():any
  {
    return _window()
  }
  constructor(private httpClient:HttpClient) { }

  getOrderId(amount:string)
  {

    this.httpClient
      .get(
        `${environment.backendURL}/payment/create-order/${amount}`
      ).
      subscribe((response:any)=>{
        this.orderId=response.orderId;
        this.orderSubject.next(this.orderId)
      })
}

  paymentSuccess(orderId:string,paymentId:string,razorpaySignature:string)
  {
    this.httpClient.get(`/payment-success/${orderId}/${paymentId}/${razorpaySignature}`).subscribe((response:any)=>{
  })

}

}



