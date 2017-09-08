import {Component, HostListener,  OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServerService} from '../server.service';
import {Skillbox} from '../skillbox.model';
import {UserService} from '../user.service';
import {Meta, Title} from '@angular/platform-browser';


import {Page} from '../page.model';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-skillpage',
  templateUrl: './skillpage.component.html',
  styleUrls: ['./skillpage.component.css']
})
export class SkillpageComponent implements OnInit {
  textPage: string;
  titleSkill: string;
  froalaOptions: Object;
  isEdit = false;
  pageSavingButtonLabel = 'Save Skill';
  showSpinner = false;
  theSkill: Skillbox = new Skillbox( '', '', '', 'Learning', '');
  theID: number;
  screenWidthFigure: number;
  isSmallScreen = false;
  thePages: Page[];
  noPages = true;
  addressSkill: string;
  isNew = false;
  isLoading = true;


  doesExist = false;

  moreContent: string;


  constructor(private titleService: Title , private metaService: Meta, private route: ActivatedRoute, private server: ServerService, private user: UserService) {


    this.froalaOptions = this.server.globalFroala;
    this.updateWidthValue();
    route.params.subscribe(params => {
      this.addressSkill = params['skill'];
      if (!this.addressSkill) {
     this.titleSkill = 'Error';
     this.textPage = 'You need to write something';
      } else {
            this.waitForArrayToLoad();
      }
    });
  }

  ngOnInit() {

    const isActive = function (cmd) {
      const blocks = this.selection.blocks();
      let tag: string;

      if (blocks.length) {
        const blk = blocks[0];
        tag = 'N';
        const default_tag = this.html.defaultTag();
        if (blk.tagName.toLowerCase() !== default_tag && blk !== this.el) {
          tag = blk.tagName;
        }
      }

      if (['LI', 'TD', 'TH'].indexOf(tag) >= 0) {
        tag = 'N';
      }

      return tag.toLowerCase() === cmd;
    };

    $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: function () {
        alert('Hello!');
      }
    });

    $.FroalaEditor.DefineIcon('h1', {NAME: '<strong>H1</strong>', template: 'text'});
    $.FroalaEditor.DefineIcon('h2', {NAME: '<strong>H2</strong>', template: 'text'});
    $.FroalaEditor.DefineIcon('h3', {NAME: '<strong>H3</strong>', template: 'text'});
    $.FroalaEditor.DefineIcon('h4', {NAME: '<strong>H4</strong>', template: 'text'});

    $.FroalaEditor.DefineIcon('p', {NAME: '<strong>p</strong>', template: 'text'});
    $.FroalaEditor.DefineIcon('pre', {NAME: '<strong>Code</strong>', template: 'text'});

    $.FroalaEditor.RegisterCommand('h1', {
      title: 'Heading 1',
      callback: function (cmd, val, params) {
        if (isActive.apply(this, [cmd])) {
          this.paragraphFormat.apply('N');
        } else {
          this.paragraphFormat.apply(cmd);
        }
      },
      refresh: function ($btn) {
        $btn.toggleClass('fr-active', isActive.apply(this, [$btn.data('cmd')]));
      }
    });

    $.FroalaEditor.RegisterCommand('h2', {
      title: 'Heading 2',
      callback: function (cmd, val, params) {
        if (isActive.apply(this, [cmd])) {
          this.paragraphFormat.apply('N');
        } else {
          this.paragraphFormat.apply(cmd);
        }
      },
      refresh: function ($btn) {
        $btn.toggleClass('fr-active', isActive.apply(this, [$btn.data('cmd')]));
      }
    });

    $.FroalaEditor.RegisterCommand('h3', {
      title: 'Heading 3',
      callback: function (cmd, val, params) {
        if (isActive.apply(this, [cmd])) {
          this.paragraphFormat.apply('N');
        } else {
          this.paragraphFormat.apply(cmd);
        }
      },
      refresh: function ($btn) {
        $btn.toggleClass('fr-active', isActive.apply(this, [$btn.data('cmd')]));
      }
    });

    $.FroalaEditor.RegisterCommand('h4', {
      title: 'Heading 4',
      callback: function (cmd, val, params) {
        if (isActive.apply(this, [cmd])) {
          this.paragraphFormat.apply('N');
        }
        else {
          this.paragraphFormat.apply(cmd);
        }
      },
      refresh: function ($btn) {
        $btn.toggleClass('fr-active', isActive.apply(this, [$btn.data('cmd')]));
      }
    });

    $.FroalaEditor.RegisterCommand('p', {
      title: 'Normal',
      callback: function (cmd, val, params) {
        if (isActive.apply(this, [cmd])) {
          this.paragraphFormat.apply('N');
        }
        else {
          this.paragraphFormat.apply(cmd);
        }
      },
      refresh: function ($btn) {
        $btn.toggleClass('fr-active', isActive.apply(this, [$btn.data('cmd')]));
      }
    });

    $.FroalaEditor.RegisterCommand('pre', {
      title: 'Code',
      callback: function (cmd, val, params) {
        if (isActive.apply(this, [cmd])) {
          this.paragraphFormat.apply('N');
        } else {
          this.paragraphFormat.apply(cmd);
        }
      },
      refresh: function ($btn) {
        $btn.toggleClass('fr-active', isActive.apply(this, [$btn.data('cmd')]));
      }
    });
  }

  getLoggedStatus(): boolean {
    return this.user.getLoggedStatus();
  }

  onToggleEditor() {
    this.isEdit = true;
  }

  onSaveSkill() {

    const originalTitle = this.addressSkill;
    const hasChangedTitle = originalTitle === this.theSkill.skillTitle ? false : true;
    this.isEdit = false;

    if (this.isNew === false && hasChangedTitle === false) {
    this.server.addDescriptionToSkill(this.theID, this.theSkill.descriptHTML);
    } else if (this.isNew === false && hasChangedTitle === true) {
      this.server.onAmendSkill(this.theSkill, this.addressSkill);

    } else {
        this.server.onSendSkill(this.theSkill);
      }

  }

  @HostListener('window:resize') updateWidthValue(): void {
    this.screenWidthFigure = window.screen.width;

    if (this.screenWidthFigure >= 768) {

      this.isSmallScreen = false;
    } else {

      this.isSmallScreen = true;
    }

  }


  onAddPage(aPage: Page) {
    this.server.addPageToSkill(aPage);
    setTimeout(() => {
      this.updateSkill();
    }, 1000);
  }


  waitForArrayToLoad() {

// I need to simplify this
    const step = 400;
    if (this.server.arraySkillboxes.length === 0) {
      setTimeout(() => {
        console.log('Array still loading 1');
        if (this.server.arraySkillboxes.length === 0) {
          setTimeout(() => {
            console.log('Array still loading 2');
            if (this.server.arraySkillboxes.length === 0) {
              setTimeout(() => {
                console.log('Array still loading 3');
                if (this.server.arraySkillboxes.length === 0) {
                  setTimeout(() => {
                    console.log('Array still loading 4');


                  }, step);
                } else { this.updateSkill();; }
              }, step);
            } else { this.updateSkill(); }
          }, step);
        } else { this.updateSkill(); }
      }, step);
    } else { this.updateSkill(); }


  }

  updateSkill() {
    if ((this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === this.addressSkill))) {
      this.theSkill = this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === this.addressSkill);
      this.theID = this.server.getArraySkillBoxes().indexOf(this.theSkill);
      this.thePages = this.server.getPages(this.theSkill);
      this.noPages = (this.thePages.length === 0) ? true : false;
      this.doesExist = true;
      // Meta tags
      const winTitle = 'Maikel.uk: ' + this.theSkill.skillTitle;
      this.titleService.setTitle( winTitle );
      this.metaService.addTag({ property: 'og:title', content: winTitle});
      this.metaService.addTag({ property: 'og:icon', content: this.theSkill.skillLogoURL });
      this.isLoading = false;
    } else {
      this.theSkill = new Skillbox('' , '', '', 'Learning', '');
      this.doesExist = false;
      this.isLoading = false;
      return;
    }
  }

  createSkill() {
    this.theSkill.skillTitle = this.addressSkill;
    this.isNew = true;
    this.isEdit = true;
    this.doesExist = true;
  }

  onCancelEdit(someVar) {

    if (this.isNew === true) {this.doesExist = false;}
    this.isEdit = false;
  }

  onRemoveSkill() {
    // this.server.onRemoveSkill(


    swal({
      title: 'Are you sure?',
      text: 'You\'ll lose the skill and any pages attached to it',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-primary',
      focusCancel: true,
      preConfirm: (data) => {

        return new Promise(function (resolve) {
          resolve();
        });
      }
    }).then(() => {
      this.server.onRemoveSkill(this.theSkill);
    }).catch(swal.noop);
  }

}


