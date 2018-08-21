export class Record {
  static readonly DATE_MOMENT_FORMAT = 'DD.MM.YYYY HH:mm';

  constructor(public project = '', public description = '') {}

  startTime: string;
  endTime: string;
  id: string;

  getStartTime(): moment.Moment {
    return this.parseDate(this.startTime);
  }
  getEndTime(): moment.Moment {
    return this.parseDate(this.endTime);
  }

  public getTimeDiff() {
    return moment.duration(this.getEndTime().diff(this.getStartTime())).asHours();
  }
  public getSecondsDiff() {
    return moment.duration(this.getEndTime().diff(this.getStartTime()));
  }

  private parseDate(field): moment.Moment {
    return moment(field, Record.DATE_MOMENT_FORMAT);
  }
}

import * as moment from 'moment';

export class RecordSummary {
  private records: Record[] = [];

  public sum = 0;

  private descriptions: string[] = [];

  add(r: Record) {
    this.records.push(r);
    if (r.endTime && r.startTime) {
      const start: Date = moment(r.startTime, Record.DATE_MOMENT_FORMAT).toDate();
      const end: Date = moment(r.endTime, Record.DATE_MOMENT_FORMAT).toDate();

      start.setSeconds(0);
      start.setMilliseconds(0);
      end.setSeconds(0);
      end.setMilliseconds(0);
      this.sum = this.sum + end.getTime() - start.getTime();
    }
    // this.sum = r.endTime && r.startTime ?this.sum + r.endTime - r.startTime:this.sum;
    this.descriptions.push(r.description);
  }

  getDescription() {
    return this.descriptions.filter((element, index, self) => index === self.indexOf(element));
  }
}

export class Filter {
  project: string;
  from: string;
  to: string;
}
