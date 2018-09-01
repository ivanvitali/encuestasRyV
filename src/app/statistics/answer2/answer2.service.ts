import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PieData } from '../pie-data.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Answer2Service {


    answer2Man1517StatisticsChanged = new Subject<PieData[]>();
    answer2Man1821StatisticsChanged = new Subject<PieData[]>();
    answer2Man2230StatisticsChanged = new Subject<PieData[]>();
    answer2Woman1517StatisticsChanged = new Subject<PieData[]>();
    answer2Woman1821StatisticsChanged = new Subject<PieData[]>();
    answer2Woman2230StatisticsChanged = new Subject<PieData[]>();


    constructor(private db: AngularFirestore) {}

    // get Answer2 Man 15-17 Statistic
    fetchAnswer2Man1517Statistic(): void {
        this.db
            .collection('/vih-statistics/man15-17/answer2')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        //id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((answer2: PieData[]) => {
                this.answer2Man1517StatisticsChanged.next([...answer2]);
            });
    }

    // get Answer2 Man 18-21 Statistic
    fetchAnswer2Man1821Statistic(): void {
        this.db
            .collection('/vih-statistics/man18-21/answer2')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        //id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((answer2: PieData[]) => {
                this.answer2Man1821StatisticsChanged.next([...answer2]);
            });
    }

    // get Answer2 Man 22-30 Statistic
    fetchAnswer2Man2230Statistic(): void {
        this.db
            .collection('/vih-statistics/man22-30/answer2')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        //id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((answer2: PieData[]) => {
                this.answer2Man2230StatisticsChanged.next([...answer2]);
            });
    }

    // get Answer2 Woman 15-17 Statistic
    fetchAnswer2Woman1517Statistic(): void {
        this.db
            .collection('/vih-statistics/woman15-17/answer2')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        //id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((answer2: PieData[]) => {
                this.answer2Woman1517StatisticsChanged.next([...answer2]);
            });
    }

    // get Answer2 Woman 18-21 Statistic
    fetchAnswer2Woman1821Statistic(): void {
        this.db
            .collection('/vih-statistics/woman18-21/answer2')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        //id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((answer2: PieData[]) => {
                this.answer2Woman1821StatisticsChanged.next([...answer2]);
            });
    }

    // get Answer2 Woman 18-21 Statistic
    fetchAnswer2Woman2230Statistic(): void {
        this.db
            .collection('/vih-statistics/woman22-30/answer2')
            .snapshotChanges()
            .pipe(map((docArray) => {
                return docArray.map((doc) => {
                    return { 
                        //id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .subscribe((answer2: PieData[]) => {
                this.answer2Woman2230StatisticsChanged.next([...answer2]);
            });
    }

    getAndUpdateVihStatisticAnswer2(answer1Options, vihCollectionOptions):void {

        for (let indexColecction = 0; indexColecction < vihCollectionOptions.length; indexColecction ++) {
          for (let index = 0; index < answer1Options.length; index ++) {
            //console.log(index, ' - ', indexColecction, ' - ', vihCollectionOptions[indexColecction].sourceCollection, ' ', answer1Options[index].position, ' ', answer1Options[index].value);
            // get number of surveys
            this.db
              .collection(vihCollectionOptions[indexColecction].sourceCollection, ref => ref.where(answer1Options[index].position,'==', answer1Options[index].value))
              .valueChanges()
              .subscribe((surveys) => {
                //console.log('get ',answer1Options[index].docId ,' ',surveys.length);
                this.updateVihStatisticAnswer1(vihCollectionOptions[indexColecction].destinyCollection, answer1Options[index].docId, surveys.length );
              });
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

}