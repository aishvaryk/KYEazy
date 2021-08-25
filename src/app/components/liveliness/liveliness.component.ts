import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-liveliness',
  templateUrl: './liveliness.component.html',
  styleUrls: ['./liveliness.component.scss']
})
export class LivelinessComponent implements OnInit {

  @ViewChild('toCapture')
  public toCapture: any;
  @ViewChild('toPlay')
  public toPlay: any;

  public camera: boolean;
  public captured: boolean;
  public timeleft: number;
  public chunks: any;
  public audioConstraints: any;
  public videoConstraints: any;
  public mediaRecorder: any;
  public stream: any;
  public blob: any;

  constructor() {
    this.camera = false;
    this.captured = false;
    this.chunks = [];
    this.timeleft = 10;
    this.videoConstraints = {
      video: {
        facingMode: "user",
      }
    };
    this.audioConstraints = {
      audio: {
        echoCancellation: true
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  async startCamera() {
    this.camera = true;
    await this.setupDevices();
    this.mediaRecorder.start();
    setTimeout(() => this.stopCamera(), 1000 * 10);
    this.timeleft = 10;
    let timer = setInterval(() => {
      if (this.timeleft <= 0) {
        clearInterval(timer);
      }
      this.timeleft -= 1;
    }, 1000);
  }

  stopCamera() {
    if (this.mediaRecorder.state === "inactive") return;
    this.captured = true;
    this.timeleft = 0;
    this.mediaRecorder.stop();
    for (let track of this.stream.getTracks()) {
      track.stop()
    }
  }

  save() {
    const videoFile = new File([this.blob], 'answer.mp4', { type: 'video/mp4' });
    console.log(videoFile);
  }

  retry() {
    this.captured = false;
    this.camera = true;
    this.startCamera();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia(this.videoConstraints);
        const audioStream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);
        this.stream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
        this.toCapture.nativeElement.srcObject = this.stream;
        this.toCapture.nativeElement.muted = true;
        this.toCapture.nativeElement.play();
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = (ev: any) => {
          this.chunks.push(ev.data);
        }
        this.mediaRecorder.onstop = (ev: any) => {
          this.blob = new Blob(this.chunks, { 'type': 'video/mp4;' });
          let videoURL = window.URL.createObjectURL(this.blob);
          this.toPlay.nativeElement.src = videoURL;
          this.chunks = [];
        }
      } catch (e) {
        console.log(e);
      }
    }

  }
}
