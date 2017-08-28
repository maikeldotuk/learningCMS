export class Skillbox  {
  constructor(public skillID: number, public skillTitle: string, public skillLogoURL: string, public skillLevel: string) {}

  getStyle() {
    switch (this.skillLevel) {
      case 'Known':
      { return 'knownTitle';
      }
      case 'Memorising':
      { return 'memorisingTitle';
      }
      case 'Learning':
      { return 'learningTitle';
      }
      case 'Queued':
      { return 'queuedTitle';
      }
      case 'Deferred':
      { return 'preparingTitle';
      }
    }
  }

  getPages(received) {

    const thePages = received.filter(item => {
      return item.skill === this.skillTitle;
    });
return thePages;


/*
    onClickSubskillUpBox(skill, subskill) {
      this.currentSkill = skill;
      const aPage = this.allSubSkills.filter(item => {
        return item.skill === skill.skillTitle && item.title === subskill;
      });


      this.onClickPage(aPage[0]);

*/


  }
}
