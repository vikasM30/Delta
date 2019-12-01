import { Component } from '@angular/core';
import { LoginService } from './shell/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.addOnSessionExpire(() => {
      this.router.navigate(['/']);
    });
  }
}
