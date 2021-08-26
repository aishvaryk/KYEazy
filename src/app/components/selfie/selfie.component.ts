  import { AfterViewInit, Component, ElementRef, OnInit, Self, ViewChild } from '@angular/core';
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

  @ViewChild('video')
  public video: any;
  @ViewChild('canvas')
  public canvas: any;

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
    await this.setupDevices();
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
    const response = await fetch(this.image);
    const blob =  await response.blob();
    const imageFile = new File([blob], 'name.png', { type: 'image/png' });
    let selfie = {} as Selfie;
    selfie.image = imageFile;
    this.store.dispatch(setSelfie(selfie));
  }

  draw(image: any) {
    this.canvas.nativeElement.getContext('2d').drawImage(image, 0, 0, 500, 300);
    this.image = this.canvas.nativeElement.toDataURL('image/png');
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        this.video.nativeElement.srcObject = this.stream;
        this.video.nativeElement.play();
      } catch (e) {
        console.error(e);
      }
    }
  }

}
