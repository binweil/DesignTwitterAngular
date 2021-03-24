import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() display: boolean;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const visible = changes.display.currentValue;
    if (visible === 'false') {
      document.getElementById('spinner').style.display = 'none';
    } else {
      document.getElementById('spinner').style.display = 'block';
    }
  }

}
