import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.css']
})
export class AlertBannerComponent implements OnInit {

  @Input() alertMessage: string;

  @Input() visible: boolean;

  @Output() dismissEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  dismissAlert(): void {
    // this.parentElement.style.display = 'none';
    this.dismissEvent.emit(false);
  }
}
