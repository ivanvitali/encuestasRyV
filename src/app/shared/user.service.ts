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
            ...user,
            registrationDate:  (new Date()).getTime()
        });
    }

    // setUserRole( userId:string ) {
    //     // let value: boolean = true;
    //     // let userRole = { userId, value };
    //     this.db
    //         .collection('roles')
    //         .add({
    //             users: {
    //                {userId} : true
    //             }
    //         });
    // }
}