import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { TimeToHoursPipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  constructor(public service: LoginService, public router: Router) {}

  ngOnInit() {}

  login(usr: string, pw: string) {
    this.service.login(usr, pw).subscribe(
      loggedIn => {
        this.service.isLoggedIn().subscribe(r => console.log('Logged: ' + r));
        this.router.navigateByUrl('record');
      },
      error => {
        alert('Login failed');
        this.service.isLoggedIn().subscribe(r => console.log('Logged: ' + r));
      }
    );
  }
}