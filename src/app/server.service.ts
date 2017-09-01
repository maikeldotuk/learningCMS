import {Injectable, Inject} from '@angular/core';
import {Page} from './page.model';
import {Skillbox} from './skillbox.model';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable()
export class ServerService {


textWhenShow = 'Show Skillset';
  titlePage: string;
  thePages: Page[] = [];
  arraySkillboxes: Skillbox[] = [];
  arrayAllPages: Page[] = [];


  pageID: any;

  editorTitleField = '';
  editorLogoField = '';
  editorAddModifyButtonVisible = true;
  editorMasteryField = 'Learning';

  moreContent: string;

  isExistingSkill = false;
  orderOnGrid: number;
  pageSavingButtonLabel = 'Save Page';
  showSkillBox = true;


  showSpinner = false;
  selectedSkill: Skillbox;
  showSkillEditor: boolean;
  showSkillEditorText = 'Hide Editor';



  server: string;

  // Moving

  contentPage: string;
  theSkillTitle: string;
  lastEdit: string;
  isPageEnabled: boolean;

  pageFroalaEditorHidden = true;

  constructor(private router: Router, private http: HttpClient, private user: UserService, @Inject('SERVER_URL') server: string) {
    this.server = server;
    this.getUpdatedSkillsGrid();
    this.getAllPagesList();
    this.showSkillEditor  = true;

  }


  /* By moving all the methods to this service I have to wrap them in all the components and therefore discover
   easily which ones uses which and if they intercommunicate or not. If they don't they can be moved locally to that
   component.
   */


  selectedSkillFromArray(index) {
    const aSkill = this.arraySkillboxes[index];

    this.isPageEnabled = false;
    if (this.user.getLoggedStatus() === false) {
      return;
    }

    this.selectedSkill = aSkill;

    this.editorTitleField = aSkill.skillTitle;
    this.editorLogoField = aSkill.skillLogoURL;
    this.editorMasteryField = aSkill.skillLevel;
    this.isExistingSkill = true;
    this.orderOnGrid = index;
    this.thePages = this.getPages(aSkill);

  }

  showPreview() {
    if (this.editorTitleField.length > 0 && this.editorLogoField.length > 0) {

      this.editorAddModifyButtonVisible = false;

      return true;
    } else {

      this.editorAddModifyButtonVisible = true;
      return false;

    }
  }


  onClearFields() {

    this.thePages = [];
    this.editorLogoField = '';
    this.editorMasteryField = 'Learning';
    this.editorTitleField = '';
    this.isExistingSkill = false;

  }

  addPageToSkill() {
    // Maybe this one can be changed.

    let results: any;
    let somePage: Page;
    const aPage = {
      title: this.moreContent,
      content: '',
      skill: this.editorTitleField,
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
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-primary',
      focusCancel: true,
      preConfirm: (data) => {

        return new Promise(function (resolve) {
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
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-primary',
      focusCancel: true,
      preConfirm: (data) => {

        return new Promise(function (resolve) {
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

    switch (this.editorMasteryField) {
      case 'Familiar': {
        return 'knownTitle';
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
          new Skillbox(data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery),
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
      title: this.editorTitleField,
      logoURL: this.editorLogoField,
      mastery: this.editorMasteryField,
    };
    const address = this.server + '/api/v1/todo';
    let results: any;
    const req = this.http.post(address, newSkill);

    req.subscribe(data => {
      results = data;
      formattedItem = new Skillbox(results._id, newSkill.title, newSkill.logoURL, newSkill.mastery);
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

    this.pageSavingButtonLabel = 'Saving';
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
      this.pageSavingButtonLabel = 'Saved';
      this.showSpinner = false;
      this.getAllPagesList();
      this.pageFroalaEditorHidden = true;
      this.pageSavingButtonLabel = 'Save';
      this.router.navigate(['/skills', aPage.skill, aPage.title]);
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
    this.pageFroalaEditorHidden = false;
  }






  movePagesToNewSkill(aSkill) {
    const thePages = this.getPages(aSkill);

    // receiving the old skill but also have the global orderOnGrid

    for (const index of Object.keys(thePages)) {

      const eachPage = thePages[index];

      const aPage = {
        title: eachPage.title,
        content: eachPage.content,
        skill: this.editorTitleField,
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

  //New setters and getters

  getArraySkillBoxes(): Skillbox[] {
    return this.arraySkillboxes;
  }


  passPage(anAddressSkill: string, anAddressPage: string) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // First step, just check if the address has all the params otherwise return

    if (!(anAddressSkill && anAddressPage)) {
      return;
    }

    // Without decodeURI doesn't work because it adds the %20 and javascript doesn't like it
    const addressSkill = decodeURI(anAddressSkill);
    const addressPage = decodeURI(anAddressPage);

    /* Second step, check if the whole SPA page just loaded because in that case you need to give a bit of time
    to the arrays to fill up with data. Otherwise everything can be instant */

    if (this.arrayAllPages.length === 0) {
      setTimeout(() => {

        const theSkill = this.arrayAllPages.filter(item =>
        item.skill === addressSkill && item.title === addressPage);

        if (!(theSkill.length === 0)) {
          const aPage = theSkill[0];
          this.showSkillBox = false;
          this.loadPage(aPage);
        } else {
          this.createOrError();
        }


      }, 500);
    } else {
      const theSkill = this.arrayAllPages.filter(item =>
      item.skill === addressSkill && item.title === addressPage);

      if (!(theSkill.length === 0)) {
        const aPage = theSkill[0];
        this.showSkillBox = false;
        this.loadPage(aPage);
      } else {
        this.createOrError();
      }
    }


  }

  loadPage(item) {
    this.pageFroalaEditorHidden = true;
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

createOrError() {
  this.router.navigate(['/error']);
}

  clearPageFields() {
    this.isPageEnabled = false;
    this.showSkillBox = true;
  }

   getShowSkillEditorText(): string {
    return this.showSkillEditorText;

  }

  getShowSkillEditor(): boolean {
    return this.showSkillEditor;
  }

  getIsPageEnabled(): boolean {
    return this.isPageEnabled;
  }

  getShowSkillbox(): boolean {
    return this.showSkillBox;
  }
}
