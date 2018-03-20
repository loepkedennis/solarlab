import {Component, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Task} from '../../../model/model-interfaces';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['task', 'selected'],
  outputs: ['taskSelected' , 'taskDelete'],
})
export class CardItemComponent {
  selected: boolean;
  task: Task;

  taskSelected  = new EventEmitter();
  taskDelete = new EventEmitter();

  select() {
    this.taskSelected.emit(this.task.id);
  }

  delete() {
    if(window.confirm('Karte wirklich löschen?')){
      this.taskDelete.emit(this.task);
    }
  }
}

