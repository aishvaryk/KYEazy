import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-liveliness',
  templateUrl: './liveliness.component.html',
  styleUrls: ['./liveliness.component.scss']
})
export class LivelinessComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('toCapture')
  public toCapture: any;

  @ViewChild('toPlay')
  public toPlay: any;

  public constraints: any;
  public error: any;
  public mediaRecorder: any;
  public chunks: any;

  constructor() {
    this.chunks = [];
    this.constraints = {
      audio: true,
      video: {
        facingMode: "user",
      }
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
        if (stream) {
          this.toCapture.nativeElement.srcObject = stream;
          this.toCapture.nativeElement.play();
          this.error = null;
          this.mediaRecorder = new MediaRecorder(stream);
          let THIS = this;

          this.mediaRecorder.ondataavailable = function(ev: any) {
            console.log(ev.data);
            console.log(THIS.chunks);
            THIS.chunks.push(ev.data);
          }

          this.mediaRecorder.onstop = function(ev: any) {
            let blob = new Blob(THIS.chunks, { 'type' : 'video/mp4;' });
            THIS.chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            THIS.toPlay.nativeElement.src = videoURL;
            THIS.toPlay.nativeElement.play();
          }

        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }



  start(): void {
    this.mediaRecorder.start();
    alert('Start');
  }

  stop(): void {
    this.mediaRecorder.stop();
    alert('Stop');
  }

}
