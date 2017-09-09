import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  screenWidthFigure: number;
  isSmallScreen: boolean;
  ngOnInit() {}


  constructor(private titleService: Title,
  ) {this.updateWidthValue();
    document.body.scrollTop = document.documentElement.scrollTop = 0;}
  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isSmallScreen = false;
    } else {

      this.isSmallScreen = true;
    }


    const winTitle = 'Maikel.uk';
    this.titleService.setTitle( winTitle );




  }

  getPaddingBottom() {
    return this.isSmallScreen === false ? '60px' : '10px';
  }

}
