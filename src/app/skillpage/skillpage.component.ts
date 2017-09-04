import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServerService} from '../server.service';
import {Skillbox} from '../skillbox.model';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-skillpage',
  templateUrl: './skillpage.component.html',
  styleUrls: ['./skillpage.component.css']
})
export class SkillpageComponent implements OnInit {
  textPage: string;
  titlePage: string;
  froalaOptions: Object;
  isEdit = false;
  pageSavingButtonLabel = 'Save Page';
  showSpinner = false;
  theSkill: Skillbox;
  theID: number;
  screenWidthFigure: number;
  isSmallScreen = false;


  constructor(private route: ActivatedRoute, private server: ServerService, private user: UserService) {

    this.froalaOptions = this.server.globalFroala;
    this.updateWidthValue();
    route.params.subscribe(params => {
      const addressSkill = params['skill'];
      if (!addressSkill) {
     this.titlePage = 'Error';
     this.textPage = 'You need to write something';
      } else {
        if (this.server.arraySkillboxes.length === 0) {
          setTimeout(() => {
            let testVar: any;
            if ((this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === addressSkill))) {
              testVar = this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === addressSkill).descriptHTML;
            } else {
              testVar = 'This skill doesn\'t exist';
            }
            this.titlePage = addressSkill;
            this.textPage = testVar;
            this.theSkill = this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === addressSkill);
            this.theID = this.server.arraySkillboxes.indexOf(this.theSkill);


          }, 300);
        } else {
          let testVar: any;
          if ((this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === addressSkill))) {
            testVar = this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === addressSkill).descriptHTML;
          } else {
            testVar = 'This skill doesn\'t exist';
          }
          this.titlePage = addressSkill;
          this.textPage = testVar;
          this.theSkill = this.server.getArraySkillBoxes().find(theSkill => theSkill.skillTitle === addressSkill);
          this.theID = this.server.arraySkillboxes.indexOf(this.theSkill);
        }

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
        }
        else {
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
        }
        else {
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
        }
        else {
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
        }
        else {
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

  onSavePage() {
    this.isEdit = false;
    this.server.addDescriptionToSkill(this.theID, this.textPage);
  }

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


