import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth'

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Answer1Service } from '../statistics/answer1/shared/answer1.service';
import { Answer2Service } from '../statistics/answer2/shared/answer2.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService {
    
    authChange = new Subject<boolean>();

    private isAuthenticated: boolean = false;

    constructor( 
        private router: Router,
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private answer1Service: Answer1Service,
        private answer2Service: Answer2Service,
        private snackbar: MatSnackBar,
        private uiService: UIService,
        private userService: UserService
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
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        )
        .then((result) => {
            this.uiService.loadingStateChanged.next(false);
            // Actualizar el nombre del usuario registrado
            let userId: string = result.user.uid;

            console.log('nombre: ', authData.name);
            result.user.updateProfile({
                displayName: authData.name,
                photoURL: ""
            })
            .then(function() {
                // console.log('se actualizo el perfil del usuario con exito');
            })
            .catch((error) => console.log(error));

            // save User data
            this.userService.saveUser({
                name: authData.name,
                email: authData.email,
                userId: userId,
                roles: { user: false }
            }, result.user.uid);
            
        })
        .catch((error) => {
            this.uiService.loadingStateChanged.next(false);
            let errorCode = error.code;
            if (errorCode == 'auth/weak-password') {
                error.message = " La contraseña es demasiado debil.";
            } else if(errorCode == 'auth/email-already-in-use') {
                error.message = " Ya existe la cuenta con el mail ingresado.";
            }
            else if(errorCode == 'auth/invalid-email') {
                error.message =" Debe ingresar una direccion del correo electronico valida.";
            }
            else {
                error.message = " " + error.message;
            }
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    login( authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        )
        .then((result) => {
            this.uiService.loadingStateChanged.next(false);
            localStorage.setItem("username", result.user.displayName);
            console.log(result.user.displayName);
        })
        .catch((error) => {
            this.uiService.loadingStateChanged.next(false);
            let errorCode = error.code;
            if (errorCode == 'auth/wrong-password') {
                error.message = " La contraseña es invalida.";
            } else if(errorCode == 'auth/user-not-found') {
                error.message = " Correo electronico invalido, no hay ningun usuario registrado con este correo electronico.";
            } else {
                error.message = " " + error.message;
            }
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