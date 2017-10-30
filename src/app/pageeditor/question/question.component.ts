import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
@Input() item: any;
@Input() index: number;
@Output() answerChosen: EventEmitter<any>;
answers = [];
  constructor() {
    this.answerChosen = new EventEmitter();

  }

  ngOnInit() {
    this.answers = this.randomize(this.item.answers);
  }

  radioClicked(answer) {
    let response = { correct: false, index: 0}
    response.correct = answer === this.item.answers[0];
    response.index = this.index;
    this.answerChosen.emit(response);
  }

  randomize(original) {
    const processed = [];
    const useThis = original.map(x => x);
    for (let i = 0; i < original.length; i++) {
      const random_index = Math.floor(Math.random() * useThis.length);
      const rand = useThis[random_index];
      useThis.splice(random_index, 1);
      processed.push(rand);
    }
    return processed;
  }

}
