import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PieData } from '../../amchart/shared/pie-data.model';
import { Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Answer1Service {

  answer1Man1517Statistics: PieData[];
  answer1Man1517StatisticsChanged = new Subject<PieData[]>();

  answer1Man1821Statistics: PieData[];
  answer1Man1821StatisticsChanged = new Subject<PieData[]>();

  answer1Man2230Statistics: PieData[];
  answer1Man2230StatisticsChanged = new Subject<PieData[]>();

  answer1Woman1517Statistics: PieData[];
  answer1Woman1517StatisticsChanged = new Subject<PieData[]>();

  answer1Woman1821Statistics: PieData[];
  answer1Woman1821StatisticsChanged = new Subject<PieData[]>();

  answer1Woman2230Statistics: PieData[];
  answer1Woman2230StatisticsChanged = new Subject<PieData[]>();

  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) { }

  // get Answer1 Man 15-17 Statistic
  fetchAnswer1Man1517Statistic(): void {
      this.fbSubs.push(this.db
        .collection('/vih-statistics/man15-17/answer1')
        .snapshotChanges()
        .pipe(map((docArray) => {
            return docArray.map((doc) => {
                return { 
                    //id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
            });
        }))
        .subscribe((answer1: PieData[]) => {
            this.answer1Man1517StatisticsChanged.next([...answer1]);
        }));
  }

  // get Answer1 Man 18-21 Statistic
  fetchAnswer1Man1821Statistic(): void {
      this.fbSubs.push(this.db
        .collection('/vih-statistics/man18-21/answer1')
        .snapshotChanges()
        .pipe(map((docArray) => {
            return docArray.map((doc) => {
                return { 
                    //id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
            });
        }))
        .subscribe((answer1: PieData[]) => {
            this.answer1Man1821StatisticsChanged.next([...answer1]);
        }));
  }

  // get Answer1 Man 22-30 Statistic
  fetchAnswer1Man2230Statistic(): void {
      this.fbSubs.push(this.db
        .collection('/vih-statistics/man22-30/answer1')
        .snapshotChanges()
        .pipe(map((docArray) => {
            return docArray.map((doc) => {
                return { 
                    //id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
            });
        }))
        .subscribe((answer1: PieData[]) => {
            this.answer1Man2230StatisticsChanged.next([...answer1]);
        }));
  }

  // get Answer1 Woman 15-17 Statistic
  fetchAnswer1Woman1517Statistic(): void {
      this.fbSubs.push(this.db
        .collection('/vih-statistics/woman15-17/answer1')
        .snapshotChanges()
        .pipe(map((docArray) => {
            return docArray.map((doc) => {
                return { 
                    //id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
            });
        }))
        .subscribe((answer1: PieData[]) => {
            this.answer1Woman1517StatisticsChanged.next([...answer1]);
        }));
  }

  // get Answer1 Woman 18-21 Statistic
  fetchAnswer1Woman1821Statistic(): void {
      this.fbSubs.push(this.db
        .collection('/vih-statistics/woman18-21/answer1')
        .snapshotChanges()
        .pipe(map((docArray) => {
            return docArray.map((doc) => {
                return { 
                    //id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
            });
        }))
        .subscribe((answer1: PieData[]) => {
            this.answer1Woman1821StatisticsChanged.next([...answer1]);
        }));
  }

  // get Answer1 Woman 18-21 Statistic
  fetchAnswer1Woman2230Statistic(): void {
      this.fbSubs.push(this.db
        .collection('/vih-statistics/woman22-30/answer1')
        .snapshotChanges()
        .pipe(map((docArray) => {
            return docArray.map((doc) => {
                return { 
                    //id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
            });
        }))
        .subscribe((answer1: PieData[]) => {
            this.answer1Woman2230StatisticsChanged.next([...answer1]);
        }));
  }

  getAndUpdateVihStatisticAnswer1(answer1Options, vihCollectionOptions):void {

    for (let indexColecction = 0; indexColecction < vihCollectionOptions.length; indexColecction ++) {
      for (let index = 0; index < answer1Options.length; index ++) {
        //console.log(index);
        // get number of surveys
        this.fbSubs.push(this.db
            .collection(vihCollectionOptions[indexColecction].sourceCollection, ref => ref.where(answer1Options[index].position,'==', true))
            .valueChanges()
            .subscribe((surveys) => {
              this.updateVihStatisticAnswer1(vihCollectionOptions[indexColecction].destinyCollection, answer1Options[index].docId, surveys.length );
            }));
      }
    }
  }

  private updateVihStatisticAnswer1(collection: string, docId: string, countNumber: number) {
    this.db
      .collection(collection)
      .doc(docId)
      .update({
        y: countNumber
      });
  }

  addDocument(document) {
      for(let index = 0; index < document.length; index++) {
        this.db
            .collection('/vih-statistics/woman22-30/answer1')
            .doc(document[index].docId)
            .set({
                y:0,
                name: document[index].name
            });
      }
    
  }

  cancelSubscriptions() {
      this.fbSubs.forEach(subscription => subscription.unsubscribe());
  }
}
