import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth'

import { User } from "./user.model";
import { AuthData } from "./auth-data.moede";
import { Answer1Service } from '../statistics/answer1/shared/answer1.service';
import { Answer2Service } from '../statistics/answer2/shared/answer2.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
    
    authChange = new Subject<boolean>();

    private isAuthenticated: boolean = false;

    constructor( 
        private router: Router,
        private afAuth: AngularFireAuth,
        private answer1Service: Answer1Service,
        private answer2Service: Answer2Service,
        private snackbar: MatSnackBar
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/survey']);
            } else {
                this.answer1Service.cancelSubscriptions();
                this.answer2Service.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser( authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        ).then((result) => {
        }).catch((error) => {
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    login( authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}