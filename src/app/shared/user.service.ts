import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";
import { User } from "../auth/user.model";

@Injectable()
export class UserService {
    constructor(private db: AngularFirestore) {}

    saveUser(user: User, uid: string) {
        // console.log('nombre del usuario: ', user.displayName);
        this.db.collection('users').doc(uid).set({
            // name: user.displayName,
            // email: user.email,
            // userId: user.uid,
            ...user,
            registrationDate:  (new Date()).getTime()
        });
    }
}