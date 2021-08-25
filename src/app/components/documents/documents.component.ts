 import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Documents } from 'src/app/models/documents.model';
import { setDocuments } from 'src/app/redux/actions/documents.actions';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  @ViewChild('a')
  public a: any;

  form: any;

  constructor(public store: Store<{ documents: Documents }>) {

    this.form = new FormGroup({
      documentType: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('',[Validators.required]),
      document: new FormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.a.nativeElement.href = url;
    this.a.nativeElement.download = "doc.png"
    this.a.nativeElement.click();

    this.form.patchValue({
      document: file,
    });
  }

  onSave() {
    if(this.form.status === "INVALID") {
      return;
    }
    let documents = {} as Documents;
    documents.document = this.form.value.document;
    documents.documentNumber = this.form.value.documentNumber;
    documents.documentType = this.form.value.documentType;
    this.store.dispatch(setDocuments(documents));
    // const formData =  new FormData();
    // formData.append('document',this.form.get('document').value);
  }

}
