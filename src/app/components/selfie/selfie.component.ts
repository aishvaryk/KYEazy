  import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  @ViewChild('a')
  public a: any;

  public stream: any;
  public captured: boolean;
  public camera: boolean;
  public image: string;

  constructor() {
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

  async stopCamera() {
    this.camera = false;
    this.video.nativeElement.pause();
    this.stream.getTracks()[0].stop();
  }

  async capture() {
    this.captured = true;
    this.draw(this.video.nativeElement);
    this.video.nativeElement.pause();
    this.stream.getTracks()[0].stop();
  }

  async retry() {
    this.startCamera();
    this.captured = false;
    this.camera = true;
  }

  async save() {
    const res = await fetch(this.image);
    const blob =  await res.blob();
    const imageFile = new File([blob], 'name.png', { type: 'image/png' });
    const url = URL.createObjectURL(imageFile);
    this.a.nativeElement.href = url;
    this.a.nativeElement.download = "name.png"
    this.a.nativeElement.click();
  }

  async draw(image: any) {
    this.canvas.nativeElement.getContext('2d').drawImage(image, 0, 0, 300, 300);
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
