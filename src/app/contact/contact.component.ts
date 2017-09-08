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
  constructor(private titleService: Title, private metaService: Meta) {
    this.updateWidthValue();
    const winTitle = 'Maikel.uk: Contact';
    document.title = winTitle;
    this.metaService.addTag({ property: 'og:title', content: winTitle});
    this.metaService.addTag({ property: 'title', content: winTitle});
    this.metaService.addTag({ property: 'og:icon', content: 'https://www.maikel.uk/images/logo.png' });
    this.metaService.addTag({ property: 'description', content: 'MKB is a CMS to help self-directed learning' });
    this.metaService.addTag({ property: 'og:type', content: 'website' });
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
