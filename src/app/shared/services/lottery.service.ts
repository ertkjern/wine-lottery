import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {LotteryModel} from '../models/lottery.model';
import {from, Observable, of} from 'rxjs';

@Injectable()
export class LotteryService {

  private lotteryCollection: AngularFirestoreCollection<LotteryModel>;

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Create a lottery.
   *
   * @param lottery model to save
   * @return id of the lottery object.
   */
  public createLottery(lottery: LotteryModel): Promise<string> {
    const generatedId = this.afs.createId();
    lottery.id = generatedId;
    return new Promise<string>(
      resolve => {
        this.afs.collection<LotteryModel>('lotteries').doc(generatedId).set(lottery).then(result => {
          resolve(lottery.id);
        }, error => {
          resolve(error);
          console.error('something went wrong creating a new lottery');
        });
      }
    );

  }
}
