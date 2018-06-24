import * as moment from 'moment';

export class Task {
  static readonly DATE_MOMENT_FORMAT = 'DD.MM.YYYY HH:mm';
  id: string;
  title: string;
  description: string;
  done: boolean = false;
  creationDate: string;
  dueDate: string;
  priority: Priority;
  finishDate: string;
  finishComment: string;

  setDone(d: boolean) {
    this.done = d;
    if (this.done) this.finishDate = moment(new Date()).format(Task.DATE_MOMENT_FORMAT);
    else {
      this.finishDate = null;
      this.finishComment = null;
    }
  }

  constructor() {
    this.creationDate = moment(new Date()).format(Task.DATE_MOMENT_FORMAT);
  }

  getDueDate(): number {
    return !this.dueDate
      ? 0
      : moment(this.dueDate, Task.DATE_MOMENT_FORMAT)
          .toDate()
          .getTime();
  }
}

export enum Priority {
  LOW,
  MIDDLE,
  HIGH,
  URGENT
}
