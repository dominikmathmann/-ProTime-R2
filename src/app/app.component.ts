import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private service: LoginService, private router: Router) {}

  logout() {
    this.service.logout().subscribe(r => this.router.navigateByUrl('login'));
  }
}
