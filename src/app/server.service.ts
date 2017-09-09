import {Injectable, Inject} from '@angular/core';
import {Page} from './page.model';
import {Skillbox} from './skillbox.model';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {setTime} from 'ngx-bootstrap/timepicker/timepicker.utils';


@Injectable()
export class ServerService {

  globalFroala: Object = {

    imageUploadURL: '/upload_image',
    imageManagerLoadURL: '/load_images',
    imageManagerDeleteURL: '/delete_image',
    placeholderText: 'Add here the text for the page',
    charCounterCount: true,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', '|', 'h1', 'h2', 'h3', 'h4', 'p', 'pre', '|', 'formatOL', 'formatUL', 'quote', 'insertLink', 'insertImage', 'insertTable', 'html'],
    /* toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', '|', 'color', 'paragraphStyle', '|', 'align',
      'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo',
      'insertFile', 'insertTable', '|', 'help', 'html', '|', 'undo', 'redo', 'paragraphFormat'], */
    tableStyles: {
      'table table-bordered': 'BS bordered',
      'table table-condensed': 'BS condensed'
    }
  };


  textWhenShow = 'Show Skillset';
  titlePage: string;
  thePages: Page[] = [];
  arraySkillboxes: Skillbox[] = [];
  arrayAllPages: Page[] = [];


  pageID: any;

  editorTitleField = '';
  editorLogoField = '';

  editorMasteryField = 'Learning';


  orderOnGrid: number;

  showSkillBox = true;


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
    this.showSkillEditor = true;

  }


  /* By moving all the methods to this service I have to wrap them in all the components and therefore discover
   easily which ones uses which and if they intercommunicate or not. If they don't they can be moved locally to that
   component.
   */

// Depreacated because the skill editor is going to be part of the skill page.


  addPageToSkill(aPage: Page) {
    // Maybe this one can be changed.

    let results: any;
    let somePage: Page;
    const theData = {
      title: aPage.title,
      content: '',
      skill: aPage.skill,
      editDate: aPage.editDate
    };
    const address = this.server + '/api/v1/page';
    const req = this.http.post(address, theData);
    req.subscribe(data => {
      results = data;
      somePage = new Page(results._id, results.title, results.content, results.skill, results.editDate);
      this.arrayAllPages.push(somePage);
    });
  }


  onRemoveSkill(theSkill: Skillbox) {
      // The actual deleting of the skill
      const id = this.arraySkillboxes.indexOf(theSkill);
      const thePages = this.getPages(theSkill);

      const address = this.server + '/api/v1/todo/' + theSkill.skillID;
      const req = this.http.delete(address);
      req.subscribe();
      this.arraySkillboxes.splice(id, 1);


      // With this the associated pages are also deleted because this it's not a modification.
      if (thePages.length === 0) {
        this.router.navigate(['skills']);
        return;
      } else {
        for (const index of Object.keys(thePages)) {
          const eachPage = thePages[index];
          const address2 = this.server + '/api/v1/page/' + eachPage.id;
          const req2 = this.http.delete(address2);
          req2.subscribe();
          this.router.navigate(['skills']);
        }
      }
  }


  getUpdatedSkillsGrid() {
    this.arraySkillboxes = [];
    const address = this.server + '/api/v1/todos';

    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.arraySkillboxes.push(
          new Skillbox(data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery, data[entry].descriptHTML),
        );
      }
      this.arraySkillboxes.sort((n1, n2) => this.sortSkills(n1, n2));
    });
  }

  sortSkills(n1: Skillbox, n2: Skillbox): number {

    if (n1.skillLevel < n2.skillLevel) {
      return -1;
    } else if (n1.skillLevel > n2.skillLevel) {
      return 1;
    }

    if (n1.skillTitle < n2.skillTitle) {
      return -1;
    } else if (n1.skillTitle > n2.skillTitle) {
      return 1;
    } else {
      return 0;
    }

  }



// IMPORTANT: Change blank here otherwise you'd overwrite them all.
  onSendSkill(theSkill: Skillbox) {

    let formattedItem: Skillbox;

    const newSkill = {
      title: theSkill.skillTitle,
      logoURL: theSkill.skillLogoURL,
      mastery: theSkill.skillLevel,
      descriptHTML: (theSkill.descriptHTML.length === 0 ? 'blank' : theSkill.descriptHTML)
    };
    const address = this.server + '/api/v1/todo';
    let results: any;
    const req = this.http.post(address, newSkill);

    req.subscribe(data => {
      results = data;
      formattedItem = new Skillbox(results.newID, newSkill.title, newSkill.logoURL, newSkill.mastery, newSkill.descriptHTML);
      this.arraySkillboxes.push(formattedItem);
      this.getAllPagesList();
      this.router.navigate(['skills']);
    });
  }


  onSavePage(thePage: Page) {

    const aPage = {
      title: thePage.title,
      content: thePage.content,
      skill: thePage.skill,
      editDate: new Date()
    };
    const address = this.server + '/api/v1/page/' + thePage.id;
    const req = this.http.put(address, aPage);
    req.subscribe(data => {
      this.getAllPagesList();
      this.getUpdatedSkillsGrid();
      this.router.navigate(['/skills', aPage.skill, aPage.title]);
    });
  }

// This is going to be to modify
  onAmendSkill(newSkill: Skillbox, oldSkillTitle: string ) {
    this.getUpdatedSkillsGrid();
    setTimeout(() => {
    const oldSkill = this.arraySkillboxes.find(aSkill => aSkill.skillTitle === oldSkillTitle);
    const orderOnGrid = this.arraySkillboxes.indexOf(oldSkill);
    this.movePagesToNewSkill(newSkill, oldSkill); // Link the pages to the new skill title.


    // Deletes the old skill without deleting the pages.
    const address = this.server + '/api/v1/todo/' + oldSkill.skillID;
    const req = this.http.delete(address);
    req.subscribe();
    this.arraySkillboxes.splice(orderOnGrid, 1);

    // Now to add the new one.
    this.onSendSkill(newSkill);
     }, 2000);
  }




  movePagesToNewSkill(newSkill: Skillbox, oldSkill: Skillbox) {
    const thePages = this.getPages(oldSkill);

    // receiving the old skill but also have the global orderOnGrid

    for (const index of Object.keys(thePages)) {

      const eachPage = thePages[index];

      const aPage = {
        title: eachPage.title,
        content: eachPage.content,
        skill: newSkill.skillTitle,
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

  // New setters and getters

  getArraySkillBoxes(): Skillbox[] {
    return this.arraySkillboxes;
  }


  createOrError() {
    this.router.navigate(['/error']);
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


  addDescriptionToSkill(theID: number, content: string) {

    // Deletes the old skill without deleting the pages.
    const id = theID;
    const theSkillToChange = this.arraySkillboxes[id];
    let formattedItem: Skillbox;

    const amendedSkill = {
      title: theSkillToChange.skillTitle,
      logoURL: theSkillToChange.skillLogoURL,
      mastery: theSkillToChange.skillLevel,
      descriptHTML: content
    };
    const address = this.server + '/api/v1/todo/' + theSkillToChange.skillID;

    let results: any;
    const req = this.http.put(address, amendedSkill);

    req.subscribe(data => {
      results = data;
      formattedItem = new Skillbox(results.newID, amendedSkill.title, amendedSkill.logoURL, amendedSkill.mastery, amendedSkill.descriptHTML);
      this.arraySkillboxes.splice(id, 1);
      this.arraySkillboxes.push(formattedItem);
      this.arraySkillboxes.sort((n1, n2) => this.sortSkills(n1, n2));
    });
  }

  onRemovePage(thePage: Page) {
    const address = this.server + '/api/v1/page/' + thePage.id;
    const req = this.http.delete(address);
    req.subscribe(data => {
      const id = this.arrayAllPages.indexOf(thePage);
      this.arrayAllPages.splice(id, 1);
      this.router.navigate(['/skills', thePage.skill]);
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
    });
  }

}
