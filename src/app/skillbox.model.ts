import {ServerService} from './server.service';


export class Skillbox {
  constructor(public skillID: number, public skillTitle: string, public skillLogoURL: string, public skillLevel: string) {
  }

  getStyle() {
    switch (this.skillLevel) {
      case 'Known': {
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

}
