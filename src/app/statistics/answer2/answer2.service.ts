import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PieData } from '../pie-data.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Answer2Service {

    answer2Man1517Statistics: PieData[];
    answer2Man1517StatisticsChanged = new Subject<PieData[]>();


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
                console.log('fetch answer2: ', answer2);
            });
    }

    getAndUpdateVihStatisticAnswer2(answer1Options, vihCollectionOptions):void {

        for (let indexColecction = 0; indexColecction < vihCollectionOptions.length; indexColecction ++) {
          for (let index = 0; index < answer1Options.length; index ++) {
            //console.log(index);
            // get number of surveys
            this.db
              .collection(vihCollectionOptions[indexColecction].sourceCollection, ref => ref.where(answer1Options[index].position,'==', true))
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