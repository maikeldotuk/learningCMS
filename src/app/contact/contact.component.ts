import {Component, HostListener, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isCollapsed = false;
  screenWidthFigure: number;
  constructor(private titleService: Title) {
    this.updateWidthValue();
    const winTitle = 'Maikel.uk: Contact';
    this.titleService.setTitle(winTitle);
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
