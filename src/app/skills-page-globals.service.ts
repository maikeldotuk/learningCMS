import { Injectable, Inject } from '@angular/core';
import {Page} from './page.model';
import {Skillbox} from './skillbox.model';

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

  constructor(@Inject('SERVER_URL') server: string) {
    this.server = server;

  }



}
