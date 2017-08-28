import {Component, OnInit} from '@angular/core';
import {Skillbox} from './skillbox.model';
import {Pagecontent} from './pagecontent.model';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageID: any;
  fieldSkillTitle = '';
  fieldLogoURL = '';
  disableAddSkillButton = true;
  fieldMasteryLevel = 'Learning';
  passContent = ['Anything'];
  thePages: Pagecontent[] = [];
  moreContent: string;
  skillSets: Skillbox[] = [];
  allSubSkills: Pagecontent[] = [];
  isModify = false;
  orderOnGrid: number;
  isSaving = 'Save Page';
  showSkillBox = true;
  toggleText = 'Expand';
  buttonModi = 'Create New';
  isLoggedIn = false;
  showSpinner = false;
  selectedSkill: Skillbox;
  showSkillEditor = true;
  showSkillEditorText = "Hide Editor";

  options: Object = {
    placeholderText: 'Add here the text for the page',
    charCounterCount: true,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', 'paragraphFormat'],
    toolbarButtonsXS: ['fullscreen', 'bold', 'italic', 'underline', '|', 'undo', 'redo', 'paragraphFormat'],
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


  // Careful when choosing either http or https
  server = 'https://www.maikel.uk';
//  server = 'http://localhost:3000';
  titlePage: string;
  contentPage: string;
  theSkillTitle: string;
  lastEdit: string;
  isPageEnabled: boolean;

  isHideEditor = true;

  constructor(private http: HttpClient) {

    this.passContent = [];
    this.isPageEnabled = false;


  }

  ngOnInit() {
    this.getUpdatedSkillsGrid();
    this.getAllPagesList();

  }


  onSelectSkill(aSkill, index) {
    this.isPageEnabled = false;
    if (this.isLoggedIn === false) {
      return;
    }
    this.buttonModi = 'Modify';
    this.isPageEnabled = false;

    this.selectedSkill = aSkill;

    this.fieldSkillTitle = aSkill.skillTitle;
    this.fieldLogoURL = aSkill.skillLogoURL;
    this.fieldMasteryLevel = aSkill.skillLevel;
    this.isModify = true;
    this.orderOnGrid = index;
    this.thePages = aSkill.getPages(this.allSubSkills);

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
    this.passContent = [];
    this.thePages = [];
    this.fieldLogoURL = '';
    this.fieldMasteryLevel = 'Learning';
    this.fieldSkillTitle = '';
    this.isModify = false;
    this.buttonModi = 'Create New';
  }

  addPageToSkill() {
    // Maybe this one can be changed.

    let results: any;
    let somePage: Pagecontent;
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
      somePage = new Pagecontent(results._id, results.title, results.content, results.skill, results.editDate);
      this.allSubSkills.push(somePage);
      this.thePages = this.selectedSkill.getPages(this.allSubSkills);

    });
    this.moreContent = '';

  }


  onRemoveSkill(id: number) {
    const theSkillToRemove = this.skillSets[id];
    const thePages = theSkillToRemove.getPages(this.allSubSkills);

    if (this.isModify === false) {
      if (confirm('Are you sure? This cannot be undone\nAll associated pages will also be deleted') === false) {
        return;
      }
    }
    const address = this.server + '/api/v1/todo/' + theSkillToRemove.skillID;
    const req = this.http.delete(address);
    req.subscribe();
    this.skillSets.splice(id, 1);

    if (this.isModify === false) {
      // With this the associated pages are also deleted if it's not a modification.
      for (const index of Object.keys(thePages)) {
        const eachPage = thePages[index];
        const address2 = this.server + '/api/v1/page/' + eachPage.id;
        const req2 = this.http.delete(address2);
        req2.subscribe();
      }
    }


  }


  onRemovePage() {

    if (confirm('Are you sure? This cannot be undone') === true) {
      const address = this.server + '/api/v1/page/' + this.pageID;
      const req = this.http.delete(address);
      req.subscribe(data => {
        this.getAllPagesList();
        this.isPageEnabled = false;
        this.onClearFields() ;
      });
    }

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
        this.skillSets.push(
          new Skillbox(data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery),
        );
      }
    });
  }

  onCreateSkill() {
    if (this.isModify === true) {
      this.movePagesToNewSkill(this.skillSets[this.orderOnGrid]); // Link the pages to the new skill title.
      this.onRemoveSkill(this.orderOnGrid); // Deletes the old skill
    }

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
      formattedItem = new Skillbox(results._id, newSkill.title, newSkill.logoURL, newSkill.mastery);
      this.skillSets.push(formattedItem);
      this.onClearFields();
      this.getAllPagesList();
    });
  }


  onSavePage() {
    // var thePage = new Pagecontent(0, this.titlePage, this.contentPage, this.fieldSkillTitle);
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
    this.allSubSkills = [];

    const address = this.server + '/api/v1/pages';
    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.allSubSkills.push(
          new Pagecontent(data[entry]._id, data[entry].title, data[entry].content, data[entry].skill, data[entry].editDate),
        );
      }
      if (this.selectedSkill) {
        this.thePages = this.selectedSkill.getPages(this.allSubSkills);
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

// this.passContent.splice(id, 1);
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
    const thePages = aSkill.getPages(this.allSubSkills);

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


  logout() {
    this.isLoggedIn = false;
  }


  login() {
    const aString: string = prompt('Password');
    const address = this.server + '/api/v1/user/' + aString;
    let results;
    this.http.get(address).subscribe(data => {
      // Read the result field from the JSON response.
      results = data;
      if (results.password === 'true') {
        this.isLoggedIn = true;
      } else {
        alert('Invalid Password');
      }
    });


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


}
