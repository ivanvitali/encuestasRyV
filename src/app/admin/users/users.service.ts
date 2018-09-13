import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Subject, Subscription } from "rxjs";
import { User } from "../../auth/user.model";

@Injectable()
export class UsersService implements OnDestroy {

    registeredUsersChanged = new Subject<User[]>();
    private registeredUsersSubscription: Subscription;

    constructor(private db: AngularFirestore) {}

    fetchRegisteredUsers() {
        this.registeredUsersSubscription = this.db
            .collection('users')
            .valueChanges()
            .subscribe((users: User[]) => {
                this.registeredUsersChanged.next(users);
        });
    }

    setAdminRole(userId: string, isAdmin: boolean, isUser: boolean): void {
        this.db
            .collection('users')
            .doc(userId)
            .update({roles: {
                admin: !isAdmin,
                user: isUser
            }});
    }

    setUserRole(userId: string, isAdmin: boolean, isUser: boolean): void {
        this.db
            .collection('users')
            .doc(userId)
            .update({roles: {
                admin: isAdmin,
                user: !isUser
            }});
    }

    ngOnDestroy() {
        this.registeredUsersSubscription.unsubscribe();
    }
}