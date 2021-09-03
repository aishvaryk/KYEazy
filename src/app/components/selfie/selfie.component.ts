  import { AfterViewInit, Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Selfie } from 'src/app/models/selfie.model';
import { setSelfie } from 'src/app/redux/actions/selfie.actions';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss']
})
export class SelfieComponent
{

  @Input() stepper!:MatStepper;

  @ViewChild('video')
  public video: any;
  @ViewChild('canvas')
  public canvas: any;
  loading!:boolean;
  public stream: any;
  public captured: boolean;
  public camera: boolean;
  public image: string;

  constructor(public store: Store<{ documents: Selfie }>) {
    this.captured = false;
    this.camera = false;
    this.image = "";
  }

  ngOnInit(): void {
  }

  async startCamera() {
    this.camera = true;
    this.loading=true;
    await this.setupDevices();
    this.loading=false;
  }

  capture() {
    this.captured = true;
    this.draw(this.video.nativeElement);
    for (let track of this.stream.getTracks()) {
      track.stop()
    }
  }

  retry() {
    this.captured = false;
    this.camera = true;
    this.startCamera();
  }

  async save() {
    this.loading=true;
    const response = await fetch(this.image);
    const blob =  await response.blob();
    this.loading=false;
    const imageFile = new File([blob], 'name.png', { type: 'image/png' });
    let selfie = {} as Selfie;
    selfie.image = imageFile;
    selfie.imageBlob=blob;
    this.store.dispatch(setSelfie(selfie));
    this.stepper.next();
  }

  draw(image: any) {
    this.canvas.nativeElement.getContext('2d').drawImage(image, 0, 0, 500, 300);
    this.image = this.canvas.nativeElement.toDataURL('image/png');
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.loading=true;
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        this.loading=false;
        this.video.nativeElement.srcObject = this.stream;
        this.video.nativeElement.play();
      } catch (e) {
        console.error(e);
      }
    }
  }

  back() {
    this.stepper.previous();
  }

}
