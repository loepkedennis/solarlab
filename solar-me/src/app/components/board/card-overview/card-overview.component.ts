import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../../model/model-interfaces';
import {BoardService} from '../../../services/board-service/board.service';
import {SettingsService} from '../../../services/settings-service/settings-service';
import * as model from '../../../model/model-interfaces';


@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.css']
})
export class CardOverviewComponent implements OnInit {

  model = model;
  
    showSuccessLabel = false;
  
    task: Task;
  
    constructor(private route: ActivatedRoute,
                private taskService: BoardService,
                private settingservice: SettingsService) {
    }
  
    ngOnInit() {
      this.route.params.subscribe((params) => {
          this.settingservice.getSetting().subscribe(res => {
            this.taskService.getTask(params['overviewid'], res).subscribe(task => {
              this.task = task;
            });
          })
      });
    }
  
}
