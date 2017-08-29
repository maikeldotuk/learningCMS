import {Component, OnInit, Inject} from '@angular/core';
import {Skillbox} from '../skillbox.model';
import {Page} from '../page.model';
import {HttpClient} from '@angular/common/http';
declare var $: any;
import swal from 'sweetalert2';
import {UserService} from "../user.service";
import {SkillsPageGlobalsService} from "../skills-page-globals.service";


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  // Careful when choosing either http or https





  constructor(private globals: SkillsPageGlobalsService, private http: HttpClient, private user: UserService) {



    this.globals.isPageEnabled = false;


  }

  ngOnInit() {



    this.getUpdatedSkillsGrid();
    this.getAllPagesList();

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
    $.FroalaEditor.DefineIcon('code', {NAME: '<strong>code</strong>', template: 'text'});
    $.FroalaEditor.DefineIcon('p', {NAME: '<strong>p</strong>', template: 'text'});
    $.FroalaEditor.DefineIcon('pre', {NAME: '<strong>pre</strong>', template: 'text'});

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

    $.FroalaEditor.RegisterCommand('code', {
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
      title: 'Pre-Formatted',
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


  onSelectSkill(aSkill, index) {

    this.globals.isPageEnabled = false;
    if (this.user.getLoggedStatus() === false) {
      return;
    }

    this.globals.isPageEnabled = false;

    this.globals.selectedSkill = aSkill;

    this.globals.fieldSkillTitle = aSkill.skillTitle;
    this.globals.fieldLogoURL = aSkill.skillLogoURL;
    this.globals.fieldMasteryLevel = aSkill.skillLevel;
    this.globals.isModify = true;
    this.globals.orderOnGrid = index;
    this.globals.thePages = aSkill.getPages();

  }

  isEnabled() {
    if (this.globals.fieldSkillTitle.length > 0 && this.globals.fieldLogoURL.length > 0) {

      this.globals.disableAddSkillButton = false;

      return true;
    } else {
      this.globals.disableAddSkillButton = true;
      return false;

    }
  }


  onClearFields() {

    this.globals.thePages = [];
    this.globals.fieldLogoURL = '';
    this.globals.fieldMasteryLevel = 'Learning';
    this.globals.fieldSkillTitle = '';
    this.globals.isModify = false;

  }

  addPageToSkill() {
    // Maybe this one can be changed.

    let results: any;
    let somePage: Page;
    const aPage = {
      title: this.globals.moreContent,
      content: '',
      skill: this.globals.fieldSkillTitle,
      editDate: new Date()
    };
    const address = this.globals.server + '/api/v1/page';
    const req = this.http.post(address, aPage);
    req.subscribe(data => {
      results = data;
      somePage = new Page(results._id, results.title, results.content, results.skill, results.editDate);
      this.globals.arrayAllPages.push(somePage);
      this.globals.thePages = this.globals.selectedSkill.getPages();

    });
    this.globals.moreContent = '';

  }


  onRemoveSkill(id: number) {

    swal({
      title: 'Are you sure?',
      text: 'You\'ll lose the skill and any pages attached to it',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      cancelButtonClass: "btn btn-primary",
      focusCancel: true,
      preConfirm: (data) => {

        return new Promise(function(resolve) {
          resolve();
        });
      }
    }).then(() => {
      // The actual deleting of the skill
      const theSkillToRemove = this.globals.arraySkillboxes[id];
      const thePages = theSkillToRemove.getPages();

      const address = this.globals.server + '/api/v1/todo/' + theSkillToRemove.skillID;
      const req = this.http.delete(address);
      req.subscribe();
      this.globals.arraySkillboxes.splice(id, 1);


      // With this the associated pages are also deleted because this it's not a modification.
      if (thePages.length === 0) {
        this.onClearFields();
        return;
      } else {
        for (const index of Object.keys(thePages)) {
          const eachPage = thePages[index];
          const address2 = this.globals.server + '/api/v1/page/' + eachPage.id;
          const req2 = this.http.delete(address2);
          req2.subscribe();
          this.onClearFields();
        }
      }
    }).catch(swal.noop);
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
      confirmButtonClass: "btn btn-danger",
      cancelButtonClass: "btn btn-primary",
      focusCancel: true,
      preConfirm: (data) => {

        return new Promise(function(resolve) {
          resolve();
        });
      }
    }).then(() => {

      const address = this.globals.server + '/api/v1/page/' + this.globals.pageID;
      const req = this.http.delete(address);
      req.subscribe(data => {
        this.getAllPagesList();
        this.globals.isPageEnabled = false;
        this.onClearFields();
      });
    }).catch(swal.noop);

  }

  getStyle() {

    switch (this.globals.fieldMasteryLevel) {
      case 'Known': {
        return 'knownTitle';
      }
      case 'Memorising': {
        return 'memorisingTitle';
      }
      case 'Learning': {
        return 'learningTitle';
      }
      case 'Queued': {
        return 'queuedTitle';
      }

    }
  }


  getUpdatedSkillsGrid() {
    const address = this.globals.server + '/api/v1/todos';

    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.globals.arraySkillboxes.push(
          new Skillbox(this.globals, data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery),
        );
      }
    });
  }

  onCreateSkill() {


    this.onSendSkill();

  }


  onSendSkill() {

    let formattedItem: Skillbox;

    const newSkill = {
      title: this.globals.fieldSkillTitle,
      logoURL: this.globals.fieldLogoURL,
      mastery: this.globals.fieldMasteryLevel,
    };
    const address = this.globals.server + '/api/v1/todo';
    let results: any;
    const req = this.http.post(address, newSkill);

    req.subscribe(data => {
      results = data;
      formattedItem = new Skillbox(this.globals, results._id, newSkill.title, newSkill.logoURL, newSkill.mastery);
      this.globals.arraySkillboxes.push(formattedItem);
      this.onClearFields();
      this.getAllPagesList();
    });
  }

//This is going to be to modify
  onAmendSkill() {

    this.movePagesToNewSkill(this.globals.arraySkillboxes[this.globals.orderOnGrid]); // Link the pages to the new skill title.


    // Deletes the old skill without deleting the pages.
    const id = this.globals.orderOnGrid;
    const theSkillToRemove = this.globals.arraySkillboxes[id];


    const address = this.globals.server + '/api/v1/todo/' + theSkillToRemove.skillID;
    const req = this.http.delete(address);
    req.subscribe();
    this.globals.arraySkillboxes.splice(id, 1);

    this.onSendSkill();

  }

  onSavePage() {

    this.globals.isSaving = 'Saving';
    this.globals.showSpinner = true;

    const options = {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    };


    this.globals.lastEdit = new Date().toLocaleString('en-GB', options);


    const aPage = {
      title: this.globals.titlePage,
      content: this.globals.contentPage,
      skill: this.globals.theSkillTitle,
      editDate: new Date()
    };
    const address = this.globals.server + '/api/v1/page/' + this.globals.pageID;
    const req = this.http.put(address, aPage);
    req.subscribe(data => {
      this.globals.isSaving = 'Saved';
      this.globals.showSpinner = false;
      this.getAllPagesList();
      this.globals.isHideEditor = true;
      this.globals.isSaving = 'Save';
    });
  }

  getAllPagesList() {

    // This must be rewrittent o avoid reading the whole set of skills
    this.globals.arrayAllPages = [];

    const address = this.globals.server + '/api/v1/pages';
    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.globals.arrayAllPages.push(
          new Page(data[entry]._id, data[entry].title, data[entry].content, data[entry].skill, data[entry].editDate),
        );
      }
      if (this.globals.selectedSkill) {
        this.globals.thePages = this.globals.selectedSkill.getPages();
      }

    });


  }


  onToggleEditor() {
    this.globals.isHideEditor = false;
  }

  toggleSkillBox() {

    if (this.globals.showSkillBox === true) {
      this.globals.showSkillBox = false;
      this.globals.toggleText = 'Shrink';

    } else {
      this.globals.showSkillBox = true;
      this.globals.toggleText = 'Expand';
    }

  }


  onClickPage(item) {


// Originally that was it.

    this.globals.isPageEnabled = true;
    this.onClearFields();

    if (item.editDate !== undefined) {
      const aDate: Date = new Date(item.editDate);
      const options = {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
      };


      this.globals.lastEdit = aDate.toLocaleString('en-GB', options);

    } else {
      this.globals.lastEdit = 'Unknown';
    }
    this.globals.theSkillTitle = item.skill;
    this.globals.titlePage = item.title;
    this.globals.contentPage = item.content;
    this.globals.pageID = item.id;
  }

  movePagesToNewSkill(aSkill) {
    const thePages = aSkill.getPages();

    // receiving the old skill but also have the global orderOnGrid

    for (const index of Object.keys(thePages)) {

      const eachPage = thePages[index];

      const aPage = {
        title: eachPage.title,
        content: eachPage.content,
        skill: this.globals.fieldSkillTitle,
        editDate: eachPage.editDate
      };
      const address = this.globals.server + '/api/v1/page/' + eachPage.id;
      const req = this.http.put(address, aPage);
      req.subscribe();
    }

  }


  onToogleEditor() {
    if (this.globals.showSkillEditor === true) {
      this.globals.showSkillEditor = false;
      this.globals.showSkillEditorText = 'Show Editor';
    } else {
      this.globals.showSkillEditor = true;
      this.globals.showSkillEditorText = 'Hide Editor';
    }


  }


}
