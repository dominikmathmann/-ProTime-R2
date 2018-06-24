import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/TaskModels';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {
  constructor() {}

  @Input('task') task: Task;

  @Output('done') done = new EventEmitter<Task>();

  ngOnInit() {}
}
