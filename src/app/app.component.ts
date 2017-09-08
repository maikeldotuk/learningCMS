import {Component, HostListener, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  screenWidthFigure: number;
  isSmallScreen: boolean;
  ngOnInit() {}


  constructor(private titleService: Title, private metaService: Meta) {this.updateWidthValue();
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
    this.metaService.addTag({ property: 'og:title', content: winTitle});
    this.metaService.addTag({ property: 'title', content: winTitle});
    this.metaService.addTag({ property: 'og:icon', content: 'https://www.maikel.uk/images/logo.png' });
    this.metaService.addTag({ property: 'description', content: 'MKB is a CMS to help self-directed learning' });
    this.metaService.addTag({ property: 'og:type', content: 'website' });



  }

  getPaddingBottom() {
    return this.isSmallScreen === false ? '100px' : '10px';
  }
}
