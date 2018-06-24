import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/TaskModels';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  public tasks: Task[];

  public task: Task = new Task();

  public displayConfirm = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getLimitedRecordReference(100).subscribe(r => {
      this.tasks = r;
      this.tasks.sort((a, b) => {
        if (a.done) return 1;
        if (b.done) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        if (a.dueDate && !b.dueDate) return -1;
        if (a.getDueDate() > b.getDueDate()) return 1;
        else return 0;
      });
    });
  }

  save() {
    this.displayConfirm = false;
    this.taskService.writeRecord(this.task).subscribe(r => {
      this.task = new Task();
      this.ngOnInit();
    });
  }

  toggleDone(task: Task) {
    task.setDone(!task.done);
    this.task = task;
    this.displayConfirm = true;
  }

  cancelConfirm() {
    this.task.setDone(!this.task.done);
    this.task = new Task();
    this.displayConfirm = false;
  }
}
