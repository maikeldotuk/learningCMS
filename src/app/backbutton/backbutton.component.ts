import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-backbutton',
  templateUrl: './backbutton.component.html',
  styleUrls: ['./backbutton.component.css']
})
export class BackbuttonComponent implements OnInit {
  buttonLocation: string;
  @Input() isEdit: boolean;
  constructor(private router: Router) {
    this.updateButtonLocation();
  }

  ngOnInit() {
  }

  @HostListener('body:resize') updateButtonLocation(): void {


    this.buttonLocation = document.body.clientWidth - 50 + 'px';

  }

  goBack() {
    this.router.navigate(['/skills']);
  }

}

