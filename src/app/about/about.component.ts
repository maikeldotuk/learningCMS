import {Component, HostListener, OnInit} from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isCollapsed = false;
  screenWidthFigure: number;
  constructor() {
    this.updateWidthValue();
  }

  ngOnInit() {
  }

  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isCollapsed = false;
    } else {

      this.isCollapsed = true;
    }

  }

}
