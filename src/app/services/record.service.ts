import { Injectable } from '@angular/core';
import { Record } from '../models/RecordingModels';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { BaseFireService } from './firebase-baseservice';

import 'rxjs/add/operator/map';

@Injectable()
export class RecordService extends BaseFireService {
  public activeRecord: Record = new Record();

  constructor(private http: HttpClient, private loginService: LoginService) {
    super();
  }

  getLimitedRecordReference(recordLimit: number): Observable<Record[]> {
    return this.http.get(`${environment.baseurl}${this.loginService.loginInformation.localId}/record.json`).map(e =>
      this.mapFromFirebase(e, () => {
        return new Record();
      })
    );
  }

  writeRecord(record: Record): Observable<any> {
    if (!record.id) {
      return this.http.post(`${environment.baseurl}${this.loginService.loginInformation.localId}/record.json`, record);
    } else {
      return this.http.put(
        `${environment.baseurl}${this.loginService.loginInformation.localId}/record/${record.id}.json`,
        record
      );
    }
  }
}
