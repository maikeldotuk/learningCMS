import {Component, HostListener, OnInit, Output, EventEmitter} from '@angular/core';
import {ServerService} from '../server.service';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../page.model';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-pageeditor',
  templateUrl: './pageeditor.component.html',
  styleUrls: ['./pageeditor.component.css']
})
export class PageeditorComponent implements OnInit {

  froalaOptions: Object;
  thePage = new Page('', '', '', '', null);
  isEdit = false;
  addressSkill: string;
  addressPage: string;
  lastEdit: string;
  pageSavingButtonLabel = 'Save Page';
  showSpinner = false;
  dateOptions = {
  weekday: 'long', year: 'numeric', month: 'long',
  day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
};

  // @Output() onSavedPage: EventEmitter<Page>;

  constructor(private route: ActivatedRoute, private router: Router, public server: ServerService, private user: UserService) {
    // this.onSavedPage = new EventEmitter();

    this.froalaOptions = this.server.globalFroala;

    route.params.subscribe(params => {
      this.addressSkill = params['skill'];
      this.addressPage = params['page'];
      if (!this.addressSkill && !this.addressPage) {
        this.thePage.skill = 'Error';
        this.thePage.content = 'You need to write something';
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

  waitForArrayToLoad() {

// I need to simplify this
const step = 300;
    if (this.server.arrayAllPages.length === 0) {
      setTimeout(() => {
        console.log('Array still loading 1');
        if (this.server.arrayAllPages.length === 0) {
          setTimeout(() => {
            console.log('Array still loading 2');
            if (this.server.arrayAllPages.length === 0) {
              setTimeout(() => {
                console.log('Array still loading 3');
                if (this.server.arrayAllPages.length === 0) {
                  setTimeout(() => {
                    console.log('Array still loading 4');


                  }, step);
                } else { this.loadPageData(); }
              }, step);
            } else { this.loadPageData(); }
              }, step);
            } else { this.loadPageData(); }
      }, step);
    } else { this.loadPageData(); }


  }

  loadPageData() {
    if ((this.server.arrayAllPages.find(thePage => thePage.skill === this.addressSkill && thePage.title === this.addressPage))) {
      this.thePage = this.server.arrayAllPages.find(thePage => thePage.skill === this.addressSkill && thePage.title === this.addressPage);
      const someDate = this.thePage.editDate;
      if (someDate !== undefined) {
        const aDate: Date = new Date(someDate);
        this.lastEdit = aDate.toLocaleString('en-GB', this.dateOptions);

      } else {
        this.lastEdit = 'Unknown';
      }
    } else {
      this.thePage.content  = 'This page doesn\'t exist';
      return;
    }
  }

  onSavePage() {
    this.pageSavingButtonLabel = 'Saving';
    this.showSpinner = true;
    this.lastEdit = new Date().toLocaleDateString('en-GB', this.dateOptions);


    this.server.onSavePage(this.thePage);
    setTimeout(() => {
      this.pageSavingButtonLabel = 'Saved';
      this.showSpinner = false;
      this.pageSavingButtonLabel = 'Save';
      this.isEdit = false;
      this.router.navigate(['/skills', this.thePage.skill, this.thePage.title]);
    }, 1000);
  }


  onRemovePage() {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted you can\'t recover this page',
        type: 'warning',
        showCancelButton: true,

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
        this.server.onRemovePage(this.thePage);
      }).catch(swal.noop);

  }
}
