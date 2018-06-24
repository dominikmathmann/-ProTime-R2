import { Component, OnInit, ViewChild } from '@angular/core';
import { Record } from '../../models/RecordingModels';
import { Calendar } from 'primeng/calendar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/timer';

import * as moment from 'moment';
import { RecordService } from '../../services/record.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeToHoursPipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  providers: []
})
export class RecordComponent implements OnInit {
  public recordItems: Record[];

  public recordLimit = 100;

  pDay: number;

  pDayInHours: string;

  pWeek: number;

  pWeekInHours: string;

  pMonth: number;

  pMonthInHours: string;

  constructor(
    private service: RecordService,
    public timeToHourConverter: TimeToHoursPipe,
    private route: ActivatedRoute
  ) {
    let params = route.snapshot.queryParams;
    if (params['project']) {
      this.service.activeRecord.project = params['project'];
    }
    this.service.activeRecord.description = params['description'];
    if ('startTime' in params && !params['startTime']) {
      this.record.startTime = moment(new Date()).format(Record.DATE_MOMENT_FORMAT);
    } else {
      this.record.startTime = params['startTime'];
      this.record.endTime = params['endTime'];
    }
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    Observable.timer(1800000, 600000).subscribe(t => {
      if (this.record.startTime) {
        this.record.endTime = moment(new Date()).format(Record.DATE_MOMENT_FORMAT);
        this.save(false);
      }
    });
  }

  get record(): Record {
    return this.service.activeRecord;
  }

  set record(r: Record) {
    this.service.activeRecord = r;
  }

  loadData() {
    this.service.getLimitedRecordReference(this.recordLimit).subscribe(r => {
      this.recordItems = r.reverse();
      this.updateProgress(this.recordItems);
    });
  }

  updateProgress(itms: Record[]) {
    let activeTaskTime = 0;
    let sumday =
      itms
        .filter(rec => moment(rec.startTime, Record.DATE_MOMENT_FORMAT).isBetween(moment().hour(0), moment().hour(23)))
        .reduce((prev, current, i) => {
          return prev + current.getTimeDiff();
        }, 0) + activeTaskTime;
    this.pDay = Math.round((100 / 7) * sumday);
    this.pDayInHours = this.timeToHourConverter.transform((sumday * 3600000).toString(), []);

    let sumweek = itms
      .filter(rec =>
        moment(rec.startTime, Record.DATE_MOMENT_FORMAT).isBetween(
          moment()
            .hour(0)
            .weekday(0),
          moment()
            .hour(23)
            .weekday(6)
        )
      )
      .reduce((prev, current, i) => {
        return prev + current.getTimeDiff();
      }, 0);
    this.pWeek = Math.round((100 / 35) * sumweek);
    this.pWeekInHours = this.timeToHourConverter.transform((sumweek * 3600000).toString(), []);

    let summonth = itms
      .filter(rec =>
        moment(rec.startTime, Record.DATE_MOMENT_FORMAT).isBetween(
          moment()
            .hour(0)
            .date(0),
          moment()
            .hour(23)
            .date(31)
        )
      )
      .reduce((prev, current, i) => {
        return prev + current.getTimeDiff();
      }, 0);
    this.pMonth = Math.round((100 / (35 * 4)) * summonth);
    this.pMonthInHours = this.timeToHourConverter.transform((summonth * 3600000).toString(), []);
  }

  setLimit(limit: string) {
    this.recordLimit = parseInt(limit, 10);
    this.loadData();
  }

  save(init = true) {
    this.service.writeRecord(this.record).subscribe(r => {
      if (init) this.init();
    });
    // if (this.record.id) {
    //   this.recordReference.set(this.keyMap.get(this.record.id), this.record);
    // } else {
    //   this.record.id = new Date().getTime().toString();
    //   this.recordReference.push(this.record);
    // }
  }

  init() {
    this.record = new Record();
    this.loadData();
  }

  setNow(field: string, inputField: Calendar) {
    this.record[field] = moment().format(Record.DATE_MOMENT_FORMAT);
  }
}
