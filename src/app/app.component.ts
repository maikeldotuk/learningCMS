import {Component, HostListener, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  screenWidthFigure: number;
  isSmallScreen: boolean;
  ngOnInit() {}


  constructor() {this.updateWidthValue();
    document.body.scrollTop = document.documentElement.scrollTop = 0;}
  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isSmallScreen = false;
    } else {

      this.isSmallScreen = true;
    }

  }

  getPaddingBottom() {
    return this.isSmallScreen === false ? '100px' : '10px';
  }
}
