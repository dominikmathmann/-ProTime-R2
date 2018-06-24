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
