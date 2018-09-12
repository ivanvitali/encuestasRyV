import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../../auth/user.model';
import { 
  MatTableDataSource,
  MatSort,
  MatPaginator
 } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  displayedColumns = ['userId', 'name', 'email','user','admin'];
  registeredUsers = new MatTableDataSource<User>();
  private registeredUsersSubscription: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit() {

    this.usersService.fetchRegisteredUsers();

    this.registeredUsersSubscription = this.usersService.registeredUsersChanged.subscribe((users: User[]) => {
      this.registeredUsers.data = users;
    });
  }

  applyFilter(filterValue: string) {
    this.registeredUsers.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.registeredUsersSubscription.unsubscribe();
  }
}
