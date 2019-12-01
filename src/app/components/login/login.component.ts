import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoginService} from '../../shell/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  errorMsg: string;
  showLoader: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.errorMsg = '';
    this.showLoader = false;
  }

  ngOnInit() {
  }

  login(username: string, pass: string) {
    this.errorMsg = '';
    this.showLoader = true;
    this.loginService.accessDashboard(username, pass).subscribe(d => {
      this.showLoader = false;
      this.router.navigate(['/home']);
    }, error1 => {
      // error code
      this.showLoader = false;
      this.errorMsg = 'The username or password is incorrect';
    });

  }

  ForgotPwd(username: string) {
    this.errorMsg = '';
    this.loginService.forgotPassword(username).subscribe((d: any) => {
      if (d.status == 400) {
        this.errorMsg = 'The username or password is incorrect';
      }
    }, (error) => {
      this.errorMsg = 'The username or password is incorrect';
    });
  }

  onKeypress(event, username: string) {
    this.login(username, event.target.value);
  }

  ngAfterViewInit(): void {
    // Adaptive Layout
    const bodyMargin = window.innerWidth;
    const bodyWidth = document.body.offsetWidth;
    const element = document.getElementById('header');
    if (bodyMargin > 1440) {
      document.getElementById('loginPage').style.marginLeft = (bodyMargin - bodyWidth) / 2 + 'px';
      document.getElementById('loginPage').style.marginRight = (bodyMargin - bodyWidth) / 2 + 'px';
      document.getElementById('loginPage').style.width = bodyWidth + 'px';
      if (element !== null) {
        element.classList.remove('w-100');
      }
    }
  }
}
