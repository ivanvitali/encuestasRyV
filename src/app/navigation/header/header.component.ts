import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean = false;
  user: firebase.User = null;
  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
    this.userSubscription = this.authService.userChange.subscribe( (user) => {
      this.user = user;
    })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
