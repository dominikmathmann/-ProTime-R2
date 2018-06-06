import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Record } from '../models/RecordingModels';

@Injectable()
export class RecordService {
  public activeRecord: Record = new Record();

  constructor(public db: AngularFireDatabase, public usr: AngularFireAuth) {}

  getLimitedRecordReference(recordLimit: number) {
    const refMethod = recordLimit && recordLimit !== -1 ? ref => ref.limitToFirst(recordLimit) : ref => ref;
    return this.db.list<Record>(`/userdata2/${this.usr.auth.currentUser.uid}/record`, ref => refMethod(ref));
  }
}
