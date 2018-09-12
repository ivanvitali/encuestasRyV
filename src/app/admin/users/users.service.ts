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

    ngOnDestroy() {
        this.registeredUsersSubscription.unsubscribe();
    }
}