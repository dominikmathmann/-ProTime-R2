import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { Record, RecordSummary, Filter } from '../../models/RecordingModels';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements AfterViewInit {
  constructor(private service: RecordService) {
    this.filter.from = moment()
      .date(1)
      .format(Record.DATE_MOMENT_FORMAT);

    this.filter.to = moment()
      .date(1)
      .add(1, 'M')
      .add(-1, 'd')
      .format(Record.DATE_MOMENT_FORMAT);
  }

  filter = new Filter();

  records: Record[];

  summary: Map<string, Map<string, RecordSummary>>;

  limit = true;

  withoutHalfTimes = true;

  ngAfterViewInit() {
    this.doFilter();
  }

  doFilter() {
    const limitNumber = this.limit ? 1000 : -1;
    this.service.getLimitedRecordReference(limitNumber).subscribe(r => {
      const activeFilter: Function[] = [];
      if (this.filter.from || this.filter.to) {
        const from = this.filter.from ? moment(this.filter.from, Record.DATE_MOMENT_FORMAT).hour(1) : moment(0);
        const to = this.filter.to ? moment(this.filter.to, Record.DATE_MOMENT_FORMAT).hour(23) : moment(10000000000000);

        activeFilter.push((rec: Record) => moment(rec.startTime, Record.DATE_MOMENT_FORMAT).isBetween(from, to));
      }

      if (this.withoutHalfTimes) {
        activeFilter.push((rec: Record) => !rec.halfTime);
      }

      if (this.filter.project) {
        activeFilter.push(
          (rec: Record) =>
            rec.project.indexOf(this.filter.project) !== -1 || rec.description.indexOf(this.filter.project) !== -1
        );
      }
      this.records = r.filter(record => {
        return activeFilter.every(f => f(record));
      });

      this.summary = this.summarizeByDay(this.records);
    });
  }

  getDaySum(day: string) {
    const sumDay = Array.from(this.summary.get(day).values()).reduce((prev, current) => {
      return prev + current.sum;
    }, 0);
    return sumDay;
  }

  getOverallSum() {
    const overallSum = Array.from(this.summary.keys()).reduce((prev, current) => {
      return prev + this.getDaySum(current);
    }, 0);
    return overallSum;
  }

  addMonth(amount: number) {
    this.filter.from = moment(this.filter.from, Record.DATE_MOMENT_FORMAT)
      .add(amount, 'months')
      .format(Record.DATE_MOMENT_FORMAT);
    this.filter.to = moment(this.filter.to, Record.DATE_MOMENT_FORMAT)
      .add(amount, 'months')
      .format(Record.DATE_MOMENT_FORMAT);
  }

  summarizeByDay(records: Record[]): Map<string, Map<string, RecordSummary>> {
    const summary = new Map<string, Map<string, RecordSummary>>();

    records.forEach(r => {
      const dayString = moment(r.startTime, Record.DATE_MOMENT_FORMAT).format('DD.MM.YYYY');
      const projectString = !r.halfTime ? r.project : r.project + ' [Fahrzeit]';

      if (!summary.has(dayString)) {
        summary.set(dayString, new Map<string, RecordSummary>());
      }
      if (!summary.get(dayString).get(projectString)) {
        summary.get(dayString).set(projectString, new RecordSummary());
      }

      summary
        .get(dayString)
        .get(projectString)
        .add(r);
    });

    return summary;
  }
}
