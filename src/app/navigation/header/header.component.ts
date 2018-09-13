import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;

  userLoggedIn: firebase.User = null;
  authSubscription: Subscription;
  userRoleSubscription: Subscription;
  adminRoleSubscription: Subscription;
  userLoggedInSubscription: Subscription;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChanged.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
    this.userRoleSubscription = this.authService.userRoleChanged.subscribe(( isUser: boolean) =>{
      this.isUser = isUser;
    });
    this.adminRoleSubscription = this.authService.adminRoleChanged.subscribe(( isAdmin: boolean) =>{
      this.isAdmin = isAdmin;
    });
    this.userLoggedInSubscription = this.authService.userLoggenInChanged.subscribe((userLoggedIn: firebase.User) => {
      this.userLoggedIn = userLoggedIn;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.userRoleSubscription.unsubscribe();
    this.adminRoleSubscription.unsubscribe();
    this.userLoggedInSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
