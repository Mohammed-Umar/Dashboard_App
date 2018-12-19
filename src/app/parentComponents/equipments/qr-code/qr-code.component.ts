import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  public qrdata: string = null;

  constructor() { }

  ngOnInit() {
    this.qrdata = 'Initial QR code data string';
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
