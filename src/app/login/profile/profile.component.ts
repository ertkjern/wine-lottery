import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
