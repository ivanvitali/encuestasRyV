import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";

@Injectable()
export class UserService {
    constructor(private db: AngularFirestore) {}

    saveUser(user: firebase.User) {
        // console.log('nombre del usuario: ', user.displayName);
        this.db.collection('users').doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            userId: user.uid,
            registerDate:  (new Date()).getTime()
        });
    }
}