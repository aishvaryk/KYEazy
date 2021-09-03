import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';
import { Employee } from 'src/app/models/employee.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { Selfie } from 'src/app/models/selfie.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @Input() userType!: string;
  @Input() selfie!: Selfie;
  @Input() company!: string;
  @Input() liveliness!: Liveliness;
  @Input() document!: Documents;
  @Input() employee!: Details;
  @Input() status!: string;

  @ViewChild('image') image!: any;
  @ViewChild('video') video!: any;

  public imageURL = '';
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    let blob = new Blob([this.selfie.image], { type: 'image/png' });
    let url = window.URL.createObjectURL(blob);
    this.image.nativeElement.src = url;
  }

  viewDocument() {
    //window.open(this.document.document);
  }
}
