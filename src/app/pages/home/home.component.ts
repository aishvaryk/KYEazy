import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  private observable: any;
  public isSmall: boolean;
  public flexDirection: String;

  constructor(public observer: MediaObserver, public dialog: MatDialog) {
    this.flexDirection = "row";
    this.isSmall = false;
  }

  ngOnInit(): void {
    this.observable = this.observer.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        this.isSmall = true;
        this.flexDirection = "column";
      } else {
        this.isSmall = false;
        this.flexDirection = "row";
      }
    });
  }

  showLoginModal(): void {
    this.dialog.open(ModalComponent,{
      data: {
        type: "LOGIN"
      }
    });
  }

  showSignupModal(): void {
    this.dialog.open(ModalComponent,{
      data: {
        type: "SIGNUP"
      }
    });
  }

  ngOnDestroy(): void {
  }

  }
