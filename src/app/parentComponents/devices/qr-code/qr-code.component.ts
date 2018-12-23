import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  public qrdata: string = null;

  public guidObject;

  constructor(private _service: DevicesService) { }

  ngOnInit() {
    this.qrdata = 'Initial QR code data string';
    // this._service.guidObject.subscribe(obj => {
    //   this.guidObject = obj;
    //   // this.qrdata = obj.object_guid;
    // });
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
