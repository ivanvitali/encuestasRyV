import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth'

import { User } from "./user.model";
import { AuthData } from "./auth-data.moede";
import { Answer1Service } from '../statistics/answer1/shared/answer1.service';
import { Answer2Service } from '../statistics/answer2/shared/answer2.service';

@Injectable()
export class AuthService {
    
    authChange = new Subject<boolean>();

    private isAuthenticated: boolean = false;

    constructor( 
        private router: Router,
        private afAuth: AngularFireAuth,
        private answer1Service: Answer1Service,
        private answer2Service: Answer2Service
    ) {}

    registerUser( authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        ).then((result) => {
            this.authSuccessfully();
        }).catch((error) => {
            console.log(error);
        });
    }

    login( authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then((result) => {
            console.log(result);
            this.authSuccessfully();
        }).catch((error) => {
            console.log(error);
        });
    }

    logout() {
        this.answer1Service.cancelSubscriptions();
        this.answer2Service.cancelSubscriptions();
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/survey']);
    }
}