import { Injectable } from '@angular/core';
import { Task } from '../models/TaskModels';
import { BaseFireService } from './firebase-baseservice';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskService extends BaseFireService {
  constructor(private http: HttpClient, private loginService: LoginService) {
    super();
  }

  getLimitedRecordReference(recordLimit: number): Observable<Task[]> {
    return this.http.get(`${environment.baseurl}${this.loginService.loginInformation.localId}/task.json`).pipe(
      map(e =>
        this.mapFromFirebase(e, () => {
          return new Task();
        })
      )
    );
  }

  writeRecord(record: Task): Observable<any> {
    if (!record.id) {
      return this.http.post(`${environment.baseurl}${this.loginService.loginInformation.localId}/task.json`, record);
    } else {
      return this.http.put(
        `${environment.baseurl}${this.loginService.loginInformation.localId}/task/${record.id}.json`,
        record
      );
    }
  }
}
