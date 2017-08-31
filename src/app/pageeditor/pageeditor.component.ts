import {Component, HostListener, OnInit} from '@angular/core';
import {ServerService} from "../server.service";
import {UserService} from '../user.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-pageeditor',
  templateUrl: './pageeditor.component.html',
  styleUrls: ['./pageeditor.component.css']
})
export class PageeditorComponent implements OnInit {
buttonLocation : string;
  froalaOptions: Object = {
    placeholderText: 'Add here the text for the page',
    charCounterCount: true,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', '|', 'h1', 'h2', 'h3', 'h4', 'p', 'pre'],
    toolbarButtonsXS: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', '|', 'h1', 'h2', 'h3', 'h4', 'p', 'pre'],
    toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', '|', 'color', 'paragraphStyle', '|', 'align',
      'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo',
      'insertFile', 'insertTable', '|', 'help', 'html', '|', 'undo', 'redo', 'paragraphFormat'],
    toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', '|', 'color', 'paragraphStyle', '|', 'align',
      'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo',
      'insertFile', 'insertTable', '|', 'help', 'html', '|', 'undo', 'redo', 'paragraphFormat'],
    tableStyles: {
      'table table-bordered': 'BS bordered',
      'table table-condensed': 'BS condensed'
    }
  };

  constructor(private router: Router, public globals: ServerService, private user: UserService
  ) {
    this.updateButtonLocation();
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

  goBack() {
   this.router.navigate(['/skills']);
  }

  @HostListener('body:resize') updateButtonLocation(): void {


    this.buttonLocation = document.body.clientWidth - 30 + 'px';

  }

}
