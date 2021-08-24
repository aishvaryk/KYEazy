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

  public stream: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  async startCamera() {
    await this.setupDevices();
  }

  async stopCamera() {
    this.stream.pause();
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
