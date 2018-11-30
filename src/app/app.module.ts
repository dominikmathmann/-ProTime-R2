import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportComponent } from './pages/report/report.component';
import { RecordComponent } from './pages/record/record.component';
import { LoginService } from './services/login.service';
import { LoginGuardService } from './services/login-guard.service';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';

import { DialogModule } from 'primeng/dialog';
import { RecordService } from './services/record.service';
import { GetValuesPipe } from './pipes/get-values.pipe';
import { TimeToHoursPipe } from './pipes/date.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TaskComponent } from './pages/task/task.component';
import { TaskInfoComponent } from './pages/task/components/task-info/task-info.component';
import { HttpauthInterceptorService } from './services/httpauth-interceptor.service';

export function loginFactory(loginService: LoginService) {
  return () => {
    return loginService.init();
  };
}

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
    CalendarModule,
    TriStateCheckboxModule,
    AccordionModule,
    CheckboxModule,
    ProgressBarModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    PanelModule,
    DialogModule
  ],
  providers: [
    LoginService,
    {
      provide: APP_INITIALIZER,
      useFactory: loginFactory,
      deps: [LoginService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpauthInterceptorService,
      multi: true
    },
    LoginGuardService,
    RecordService,
    GetValuesPipe,
    TimeToHoursPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
