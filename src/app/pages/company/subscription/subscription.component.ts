import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddCoinsComponent } from 'src/app/components/add-coins/add-coins.component';

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
  pricePerCoin!: number;
  invalidForm: boolean = true;
  coinsToAdd!: number;
  companyId!: number;
  orderHistory = [];
  displayedColumns: string[] = [];
  constructor(
    private paymentService: PaymentService,
    private companyService: CompanyService,
    private _bottomSheet: MatBottomSheet,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'companyOrderId',
      'orderId',
      'paymentId',
      'amount',
    ];
    let k = localStorage.getItem('Id');
    if (k != null) {
      this.companyId = parseInt(k);
    }

    this.companyService.getCompanyDetails(this.companyId);
    this.companyService.companySubject.subscribe((company) => {
      this.ngZone.run(() => (this.coinBalance = company.coins));
      this.paymentService.getOrderHistory(this.companyId);
      this.paymentService.orderHistory.subscribe((p) => {
        this.ngZone.run(() => (this.orderHistory = p));
      });
    });
  }
  openBottomSheet() {
    this._bottomSheet.open(AddCoinsComponent);
  }
}
