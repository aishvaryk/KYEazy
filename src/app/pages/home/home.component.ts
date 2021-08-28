import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { LoginService } from 'src/app/services/Login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  loginService:LoginService;
  public isSmall: any;
  public flexDirection: any;
  public user: any;

  constructor(
    public observer: MediaObserver,
    public dialog: MatDialog,
    public store: Store<{ breakpoint: Breakpoint }>,
    loginService:LoginService
    ) {

    this.loginService=loginService;
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if(breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
        this.flexDirection = "column";
      }
      else {
        this.isSmall = false;
        this.flexDirection = "row";
      }
    })

  }

  ngOnInit(): void {
    console.log(localStorage);
    this.loginService.logout();
  }


  showEmployeeLoginModal(): void {
    this.dialog.open(ModalComponent,{
      data: {
        type: "EMPLOYEE_LOGIN"
      }
    });

  }

  showCompanyLoginModal(): void {
    this.dialog.open(ModalComponent,{
      data: {
        type: "COMPANY_LOGIN"
      }
    });
  }

  ngOnDestroy(): void {
  }

  }
