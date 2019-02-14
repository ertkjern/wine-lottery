import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {LotteryModel} from '../models/lottery.model';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

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
    lottery.createdDate = firebase.firestore.Timestamp.now();
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

  /**
   * Get a spesific lottery based on its id
   *
   * @param lotteryId
   */
  getLottery(lotteryId: string) {
    return this.afs.doc<LotteryModel>('lotteries/' + lotteryId).valueChanges();
  }

  /**
   * Update a lotterymodel
   *
   * @param updatedLotteryModel
   */
  updateLottery(updatedLotteryModel: LotteryModel) {
    this.afs.doc<LotteryModel>('lotteries/' + updatedLotteryModel.id).update(updatedLotteryModel);
  }

  /**
   * Get all ids by user ID.
   *
   * @param uid
   */
  public getMyLotteries(uid: string): Observable<LotteryModel[]> {
    return this.afs.collection<LotteryModel>('lotteries', ref => ref.where('userId', '==', uid)).valueChanges();
  }
}
