import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReportComponent } from './pages/report/report.component';
import { RecordComponent } from './pages/record/record.component';
import { LoginGuardService } from './services/login-guard.service';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'record', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'report', component: ReportComponent, canActivate: [LoginGuardService] },
  { path: 'record', component: RecordComponent, canActivate: [LoginGuardService] },
  { path: 'task', component: TaskComponent, canActivate: [LoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
