import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportComponent } from './pages/report/report.component';
import { RecordComponent } from './pages/record/record.component';
import { environment } from '../environments/environment';
import { LoginService } from './services/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginGuardService } from './services/login-guard.service';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { RecordService } from './services/record.service';
import { GetValuesPipe } from './pipes/get-values.pipe';
import { TimeToHoursPipe } from './pipes/date.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './pages/task/task.component';
import { TaskInfoComponent } from './pages/task/components/task-info/task-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportComponent,
    RecordComponent,
    GetValuesPipe,
    TimeToHoursPipe,
    TaskComponent,
    TaskInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    CalendarModule,
    TriStateCheckboxModule,
    AccordionModule,
    ProgressBarModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    PanelModule
  ],
  providers: [AngularFireAuth, LoginService, LoginGuardService, RecordService, GetValuesPipe, TimeToHoursPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
