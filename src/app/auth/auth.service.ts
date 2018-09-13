import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from 'rxjs/operators';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Answer1Service } from '../statistics/answer1/shared/answer1.service';
import { Answer2Service } from '../statistics/answer2/shared/answer2.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService implements OnDestroy {
    
    authChanged = new Subject<boolean>();
    authStateSubscription: Subscription;

    userRoleChanged = new Subject<boolean>();
    userRoleSubscription: Subscription;

    //userRoleChange = new Subject<firebase.User>();
    //adminRoleChange = new Subject<firebase.User>();
    
    adminRoleChanged = new Subject<boolean>();
    adminRoleSubscription: Subscription;

    userLoggenInChanged = new Subject<firebase.User>();
    


    private isAuthenticated: boolean = false;
    private isUserRole: boolean = false;
    private isAdminRole: boolean = false;

    //userRoleChange = new Subject<boolean>();

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
        this.authStateSubscription = this.afAuth.authState.subscribe(( user: firebase.User ) => {
            if (user) {
                this.isAuthenticated = true;
                this.authChanged.next(true);
                this.userLoggenInChanged.next(user);

                this.userRoleSubscription = this.db.collection('users').doc(user.uid)
                    .snapshotChanges()
                    .pipe(map((docSnapShot) => {
                        return docSnapShot.payload.data();
                    }))
                    .subscribe((user: User) => {
                        this.isUserRole = user.roles.user;
                        this.userRoleChanged.next(user.roles.user);
                    });

                this.adminRoleSubscription = this.db.collection('users').doc(user.uid)
                    .valueChanges()
                    .subscribe((userData: User) => {
                        this.adminRoleChanged.next(userData.roles.admin);
                        this.isAdminRole = userData.roles.admin;
                    });

                this.router.navigate(['/home']);
            } else {
                this.answer1Service.cancelSubscriptions();
                this.answer2Service.cancelSubscriptions();
                this.authChanged.next(false);
                this.userLoggenInChanged.next(null);
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
                roles: {    user: false,
                            admin: false 
                        }
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

    isUser() {
        return this.isUserRole;
    }

    isAdmin() {
        return this.isAdminRole;
    }

    ngOnDestroy() {
        this.authStateSubscription.unsubscribe();
        this.userRoleSubscription.unsubscribe();
        this.adminRoleSubscription.unsubscribe();
    }
}