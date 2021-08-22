import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form: FormGroup
  deviceXs: any;
  breakpoint$: Observable<Breakpoint>;

  constructor(public store: Store<{breakpoint: Breakpoint}>) {
    this.form = new FormGroup({});
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => this.deviceXs=breakpoint.isXs);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(false),
      contact: new FormControl(''),
      email: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
    });
  }



}
