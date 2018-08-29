import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PieData } from './pie-data.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Answer1PieService {

  answer1Man1517Statistics: PieData[];
  answer1Man1517StatisticsChanged = new Subject<PieData[]>();

  answer1Man1821Statistics: PieData[];
  answer1Man1821StatisticsChanged = new Subject<PieData[]>();

  constructor(private db: AngularFirestore) { }

  // get Answer1 Man 15-17 Statistic
  fetchAnswer1Man1517Statistic(): void {
    this.db
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
            this.answer1Man1517Statistics = answer1;
            this.answer1Man1517StatisticsChanged.next([...this.answer1Man1517Statistics]);
        });
  }

  // get Answer1 Man 18-21 Statistic
  fetchAnswer1Man1821Statistic(): void {
    this.db
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
            this.answer1Man1821Statistics = answer1;
            this.answer1Man1821StatisticsChanged.next([...this.answer1Man1821Statistics]);
        });
  }

  getAndUpdateVihStatisticAnswer1(answer1Options, vihCollectionOptions):void {

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
