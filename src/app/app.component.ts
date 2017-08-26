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
  skilltitle = '';
  logoURL = '';
  disableAddSkillButton = true;
  levelOfMastery = 'Learning';
  passContent = ['Anything'];
  thePages: Pagecontent[] = [];
  moreContent: string;
  skillSets: Skillbox[] = [];
  allSubSkills: Pagecontent[] = [];
  isModify: boolean;
  modifyingID: number;
  isSaving = 'Save Page';
  showSkillBox = true;
  toggleText = 'Hide';
  currentSkill: Skillbox;
  buttonModi = 'Create New';
  isLoggedIn = true;
  showSpinner = false;

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
    this.getSkills();
    this.loadSubSkills();

  }

  onCreateSkill() {
    if (this.isModify === true) {
      this.onLinkPage(this.skillSets[this.modifyingID]); // Link the pages to the new skill title.
      this.onRemoveSkill(this.modifyingID); // Deletes the old skill
    }

    this.onSendSkill();
    this.fixLastSkill();

    setTimeout(() => {
      this.loadSubSkills();
      if (this.isModify === false) {
        this.onClearFields();
      }
    }, 500);


  }


  onModifySkill(id: number) {
    this.isPageEnabled = false;
    if (this.isLoggedIn === false) {
      return;
    }
    this.buttonModi = 'Modify';
    this.isPageEnabled = false;
    this.skilltitle = this.skillSets[id].skillTitle;
    this.logoURL = this.skillSets[id].skillLogoURL;
    this.levelOfMastery = this.skillSets[id].skillLevel;
    this.isModify = true;
    this.modifyingID = id;


    this.loadSubSkills();


  }

  isEnabled() {
    if (this.skilltitle.length > 0 && this.logoURL.length > 0) {

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
    this.logoURL = '';
    this.levelOfMastery = 'Learning';
    this.skilltitle = '';
    this.isModify = false;
    this.buttonModi = 'Create New';
  }

  addContentToArray() {
    // Maybe this one can be changed.

    this.passContent.push(this.moreContent);
    const aPage = {
      title: this.moreContent,
      content: '',
      skill: this.skilltitle,
      editDate: new Date()
    };
    const address = this.server + '/api/v1/page';
    const req = this.http.post(address, aPage);
    req.subscribe();

    setTimeout(() => {
      this.moreContent = '';
      this.loadSubSkills();
    }, 500);


  }


  onRemoveSkill(id: number) {

    if (this.isModify === false) {
      if (confirm('Are you sure? This cannot be undone') === false) {
        return;
      }
    }
    const address = this.server + '/api/v1/todo/' + this.skillSets[id].skillID;
    const req = this.http.delete(address);
    req.subscribe();
    this.skillSets.splice(id, 1);

  }

  // Right now nobody is implementing this
  onRemoveSubskill() {

    if (confirm('Are you sure? This cannot be undone') === true) {
      const address = this.server + '/api/v1/page/' + this.pageID;
      const req = this.http.delete(address);
      req.subscribe();

      setTimeout(() => {
        this.loadSubSkills();
        this.isPageEnabled = false;
      }, 500);
    }

  }

  getStyle() {
    switch (this.levelOfMastery) {
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

  onSendSkill() {

    const _todo = {
      title: this.skilltitle,
      logoURL: this.logoURL,
      mastery: this.levelOfMastery,
      pages: this.passContent
    };
    const address = this.server + '/api/v1/todo';
    const req = this.http.post(address, _todo);
    req.subscribe();

  }

  getSkills() {
    const address = this.server + '/api/v1/todos';

    this.http.get(address).subscribe(data => {



      // Read the result field from the JSON response.

      for (const entry of Object.keys(data)) {
        this.skillSets.push(
          new Skillbox(data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery, data[entry].pages),
        );
      }
    });
  }

  fixLastSkill() {

    // This is to ensure it adds the item with the ID
    let item: any;
    let formattedItem: Skillbox;

    // Without this wait it'll delete the previous skillbox instead of the newest one.
    setTimeout(() => {
      const address = this.server + '/api/v1/todos';
      this.http.get(address).subscribe(data => {
// Get the last item
        item = data[Object.keys(data)[Object.keys(data).length - 1]];
        formattedItem = new Skillbox(item._id, item.title, item.logoURL, item.mastery, item.pages);

        this.skillSets.push(formattedItem);
      });
    }, 1000);


  }


  onClickSubskill(item) {

// this.passContent.splice(id, 1);
// Originally that was it.

    this.isPageEnabled = true;

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

  onSavePage() {
    // var thePage = new Pagecontent(0, this.titlePage, this.contentPage, this.skilltitle);
    this.isSaving = 'Saving';
    this.showSpinner = true;

    const options = {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    };


    this.lastEdit = new Date().toLocaleString('en-GB', options);


    let theParentSkill: string;
    if (this.currentSkill.skillTitle) {
      theParentSkill = this.currentSkill.skillTitle;
    } else {
      theParentSkill = this.titlePage;
    }


    const aPage = {
      title: this.titlePage,
      content: this.contentPage,
      skill: theParentSkill,
      editDate: new Date()
    };
    const address = this.server + '/api/v1/page/' + this.pageID;
    const req = this.http.put(address, aPage);
    req.subscribe();

    setTimeout(() => {
      this.isSaving = 'Saved';
      this.showSpinner = false;
      this.loadSubSkills();
    }, 1000);


  }

  loadSubSkills() {

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

    });


    setTimeout(() => {
      this.thePages = [];
      this.thePages = this.allSubSkills.filter(item => {
        return item.skill === this.skilltitle;
      });
      this.isHideEditor = true;
      this.isSaving = 'Save';
    }, 500);

    const aTempArray: Skillbox[] = [];

    setTimeout(() => {
      for (const aSkill of Object.keys(this.skillSets)) {
        const theSkill = this.skillSets[aSkill];
        const listSubskills: string[] = [];
        for (const aSubskill of Object.keys(this.allSubSkills)) {
          const theSubskill = this.allSubSkills[aSubskill];
          if (theSkill.skillTitle === theSubskill.skill) {
            listSubskills.push(theSubskill.title);
          }
          /*console.log(this.skillSets[aSkill].skillTitle);
           console.log(this.skillSets[aSkill].skillContent);*/
        }
        aTempArray.push(new Skillbox(theSkill.skillID, theSkill.skillTitle, theSkill.skillLogoURL, theSkill.skillLevel, listSubskills));

      }
      this.skillSets = aTempArray;
    }, 1000);


    /*
     this.skillSets.push(
     new Skillbox(data[entry]._id, data[entry].title, data[entry].logoURL, data[entry].mastery, data[entry].pages),
     );*/


  }

  onToggleEditor() {
    this.isHideEditor = false;
  }

  toggleSkillBox() {

    if (this.showSkillBox === true) {
      this.showSkillBox = false;
      this.toggleText = 'Show';

    } else {
      this.showSkillBox = true;
      this.toggleText = 'Hide';
    }

  }

  onClickSubskillUpBox(skill, subskill) {
    this.currentSkill = skill;
    const aPage = this.allSubSkills.filter(item => {
      return item.skill === skill.skillTitle && item.title === subskill;
    });


    this.onClickSubskill(aPage[0]);
  }

  onLinkPage(aSkill) {
    // receiving the old skill but also have the global modifyingID

    for (const index of Object.keys(this.allSubSkills)) {

      const theSubskillObject = this.allSubSkills[index];
      for (const theSubSkillString in aSkill.skillContent) {
        if (aSkill.skillContent[theSubSkillString] === theSubskillObject.title) {

          const aPage = {
            title: theSubskillObject.title,
            content: theSubskillObject.content,
            skill: this.skilltitle,
            editDate: theSubskillObject.editDate
          };
          const address = this.server + '/api/v1/page/' + theSubskillObject.id;
          const req = this.http.put(address, aPage);
          req.subscribe();
        }

      }

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
    });

    setTimeout(() => {
      if (results.password === 'true') {
        this.isLoggedIn = true;
      } else {
        alert('Invalid Password');
      }
    }, 1000);


    // Read the result field from the JSON response.


  }
}
