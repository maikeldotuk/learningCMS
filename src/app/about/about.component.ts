import {Component, HostListener, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isCollapsed = false;
  screenWidthFigure: number;
  constructor(private titleService: Title) {
    this.titleService.setTitle( 'Maikel.uk: About');
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

  getPaddingBottom() {
    return this.isCollapsed === false ? '100px' : '10px';
  }

}
