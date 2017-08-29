import { Injectable, Inject } from '@angular/core';
import {Page} from './page.model';
import {Skillbox} from './skillbox.model';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import swal from 'sweetalert2';


@Injectable()
export class SkillsPageGlobalsService {

  titlePage: string;
  thePages: Page[] = [];
  arraySkillboxes: Skillbox[] = [];
  arrayAllPages: Page[] = [];


  pageID: any;

  fieldSkillTitle = '';
  fieldLogoURL = '';
  disableAddSkillButton = true;
  fieldMasteryLevel = 'Learning';

  moreContent: string;

  isModify = false;
  orderOnGrid: number;
  isSaving = 'Save Page';
  showSkillBox = true;
  toggleText = 'Expand';

  showSpinner = false;
  selectedSkill: Skillbox;
  showSkillEditor = true;
  showSkillEditorText = 'Hide Editor';

  froalaOptions: Object = {
    placeholderText: 'Add here the text for the page',
    charCounterCount: true,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', '|', 'h1', 'h2', 'h3', 'h4', 'code', 'p', 'pre'],
    toolbarButtonsXS: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', '|', 'h1', 'h2', 'h3', 'h4', 'code', 'p', 'pre'],
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

  server: string;

  // Moving

  contentPage: string;
  theSkillTitle: string;
  lastEdit: string;
  isPageEnabled: boolean;

  isHideEditor = true;

  constructor(private http: HttpClient, private user: UserService, @Inject('SERVER_URL') server: string) {
    this.server = server;

  }





  onSelectSkill(aSkill, index) {

    this.isPageEnabled = false;
    if (this.user.getLoggedStatus() === false) {
      return;
    }

    this.isPageEnabled = false;

    this.selectedSkill = aSkill;

    this.fieldSkillTitle = aSkill.skillTitle;
    this.fieldLogoURL = aSkill.skillLogoURL;
    this.fieldMasteryLevel = aSkill.skillLevel;
    this.isModify = true;
    this.orderOnGrid = index;
    this.thePages = this.getPages(aSkill);

  }

  isEnabled() {
    if (this.fieldSkillTitle.length > 0 && this.fieldLogoURL.length > 0) {

      this.disableAddSkillButton = false;

      return true;
    } else {
      this.disableAddSkillButton = true;
      return false;

    }
  }


  onClearFields() {

    this.thePages = [];
    this.fieldLogoURL = '';
    this.fieldMasteryLevel = 'Learning';
    this.fieldSkillTitle = '';
    this.isModify = false;

  }

  addPageToSkill() {
    // Maybe this one can be changed.

    let results: any;
    let somePage: Page;
    const aPage = {
      title: this.moreContent,
      content: '',
      skill: this.fieldSkillTitle,
      editDate: new Date()
    };
    const address = this.server + '/api/v1/page';
    const req = this.http.post(address, aPage);
    req.subscribe(data => {
      results = data;
      somePage = new Page(results._id, results.title, results.content, results.skill, results.editDate);
      this.arrayAllPages.push(somePage);
      this.thePages = this.getPages(this.selectedSkill);

    });
    this.moreContent = '';

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
      const theSkillToRemove = this.arraySkillboxes[id];
      const thePages = this.getPages(theSkillToRemove);

      const address = this.server + '/api/v1/todo/' + theSkillToRemove.skillID;
      const req = this.http.delete(address);
      req.subscribe();
      this.arraySkillboxes.splice(id, 1);


      // With this the associated pages are also deleted because this it's not a modification.
      if (thePages.length === 0) {
        this.onClearFields();
        return;
      } else {
        for (const index of Object.keys(thePages)) {
          const eachPage = thePages[index];
          const address2 = this.server + '/api/v1/page/' + eachPage.id;
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

      const address = this.server + '/api/v1/page/' + this.pageID;
      const req = this.http.delete(address);
      req.subscribe(data => {
        this.getAllPagesList();
        this.isPageEnabled = false;
        this.onClearFields();
      });
    }).catch(swal.noop);

  }

  getStyle() {

    switch (this.fieldMasteryLevel) {
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
    const address = this.server + '/api/v1/todos';

    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.arraySkillboxes.push(
          new Skillbox( data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery),
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
      title: this.fieldSkillTitle,
      logoURL: this.fieldLogoURL,
      mastery: this.fieldMasteryLevel,
    };
    const address = this.server + '/api/v1/todo';
    let results: any;
    const req = this.http.post(address, newSkill);

    req.subscribe(data => {
      results = data;
      formattedItem = new Skillbox( results._id, newSkill.title, newSkill.logoURL, newSkill.mastery);
      this.arraySkillboxes.push(formattedItem);
      this.onClearFields();
      this.getAllPagesList();
    });
  }

//This is going to be to modify
  onAmendSkill() {

    this.movePagesToNewSkill(this.arraySkillboxes[this.orderOnGrid]); // Link the pages to the new skill title.


    // Deletes the old skill without deleting the pages.
    const id = this.orderOnGrid;
    const theSkillToRemove = this.arraySkillboxes[id];


    const address = this.server + '/api/v1/todo/' + theSkillToRemove.skillID;
    const req = this.http.delete(address);
    req.subscribe();
    this.arraySkillboxes.splice(id, 1);

    this.onSendSkill();

  }

  onSavePage() {

    this.isSaving = 'Saving';
    this.showSpinner = true;

    const options = {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    };


    this.lastEdit = new Date().toLocaleString('en-GB', options);


    const aPage = {
      title: this.titlePage,
      content: this.contentPage,
      skill: this.theSkillTitle,
      editDate: new Date()
    };
    const address = this.server + '/api/v1/page/' + this.pageID;
    const req = this.http.put(address, aPage);
    req.subscribe(data => {
      this.isSaving = 'Saved';
      this.showSpinner = false;
      this.getAllPagesList();
      this.isHideEditor = true;
      this.isSaving = 'Save';
    });
  }

  getAllPagesList() {

    // This must be rewrittent o avoid reading the whole set of skills
    this.arrayAllPages = [];

    const address = this.server + '/api/v1/pages';
    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.arrayAllPages.push(
          new Page(data[entry]._id, data[entry].title, data[entry].content, data[entry].skill, data[entry].editDate),
        );
      }
      if (this.selectedSkill) {
        this.thePages = this.getPages(this.selectedSkill);
      }

    });


  }


  onToggleEditor() {
    this.isHideEditor = false;
  }

  toggleSkillBox() {

    if (this.showSkillBox === true) {
      this.showSkillBox = false;
      this.toggleText = 'Shrink';

    } else {
      this.showSkillBox = true;
      this.toggleText = 'Expand';
    }

  }


  onClickPage(item) {


// Originally that was it.

    this.isPageEnabled = true;
    this.onClearFields();

    if (item.editDate !== undefined) {
      const aDate: Date = new Date(item.editDate);
      const options = {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
      };


      this.lastEdit = aDate.toLocaleString('en-GB', options);

    } else {
      this.lastEdit = 'Unknown';
    }
    this.theSkillTitle = item.skill;
    this.titlePage = item.title;
    this.contentPage = item.content;
    this.pageID = item.id;
  }

  movePagesToNewSkill(aSkill) {
    const thePages = this.getPages(aSkill);

    // receiving the old skill but also have the global orderOnGrid

    for (const index of Object.keys(thePages)) {

      const eachPage = thePages[index];

      const aPage = {
        title: eachPage.title,
        content: eachPage.content,
        skill: this.fieldSkillTitle,
        editDate: eachPage.editDate
      };
      const address = this.server + '/api/v1/page/' + eachPage.id;
      const req = this.http.put(address, aPage);
      req.subscribe();
    }

  }


  onToogleEditor() {
    if (this.showSkillEditor === true) {
      this.showSkillEditor = false;
      this.showSkillEditorText = 'Show Editor';
    } else {
      this.showSkillEditor = true;
      this.showSkillEditorText = 'Hide Editor';
    }




  }

  getPages(aSkill) {

    const thePages = this.arrayAllPages.filter(item => {
      return item.skill === aSkill.skillTitle;
    });

    return thePages;
  }



}
