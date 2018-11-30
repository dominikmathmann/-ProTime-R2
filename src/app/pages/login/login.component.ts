import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  constructor(public service: LoginService, public router: Router) {}

  ngOnInit() {}

  login(usr: string, pw: string) {
    this.service.login(usr, pw).subscribe(
      loggedIn => {
        this.router.navigateByUrl('record');
      },
      error => {
        alert('Login failed');
      }
    );
  }
}
