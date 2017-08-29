import {SkillsPageGlobalsService} from './skills-page-globals.service';


export class Skillbox {
  constructor(private globals: SkillsPageGlobalsService, public skillID: number, public skillTitle: string, public skillLogoURL: string, public skillLevel: string) {
  }

  getStyle() {
    switch (this.skillLevel) {
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
      case 'Deferred': {
        return 'preparingTitle';
      }
    }
  }

  getPages() {

    const thePages = this.globals.arrayAllPages.filter(item => {
      return item.skill === this.skillTitle;
    });

    return thePages;
  }
}
