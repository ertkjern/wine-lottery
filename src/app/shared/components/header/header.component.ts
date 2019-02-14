import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showLogout: boolean;
  @Input() title: string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
