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
  private tasksReference;

  public tasks: Task[];

  public task: Task = new Task();

  private keyMap = new Map<any, any>();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasksReference = this.taskService.getLimitedRecordReference(100);
    this.keyMap = new Map();
    this.tasksReference.snapshotChanges().subscribe(e => {
      e.map(changes => this.keyMap.set(changes.payload.val().id, changes.payload.key));
      this.tasks = e.map(changes => changes.payload.val()).map(changes => Object.assign(new Task(), changes));
      // this.tasks.reverse();
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
    this.task.id = new Date().getTime().toString();
    this.tasksReference.push(this.task);
    this.task = new Task();
  }

  toggleDone(task: Task) {
    task.setDone(!task.done);
    this.tasksReference.set(this.keyMap.get(task.id), task);
  }
}
