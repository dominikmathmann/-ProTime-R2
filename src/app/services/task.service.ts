import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Task } from '../models/TaskModels';

@Injectable()
export class TaskService {
  constructor(public db: AngularFireDatabase, public usr: AngularFireAuth) {}

  getLimitedRecordReference(recordLimit: number): AngularFireList<Task> {
    const refMethod = recordLimit && recordLimit !== -1 ? ref => ref.limitToFirst(recordLimit) : ref => ref;
    return this.db.list<Task>(`/userdata2/${this.usr.auth.currentUser.uid}/task`, ref => refMethod(ref));
  }
}
