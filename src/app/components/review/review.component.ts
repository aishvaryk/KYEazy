import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(public store: Store<{ details: Details, documents: Documents }>) {
    this.store.select('details').subscribe((details) => console.log(details));
    this.store.select('documents').subscribe((documents) => console.log(documents));
  }

  ngOnInit(): void {
  }

}
