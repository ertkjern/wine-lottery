import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {LotteryModel} from '../models/lottery.model';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {DrawModel} from '../models/draw.model';

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
    lottery = this.addDraws(lottery);

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
   * Create draw model for each amount of lotteries that should be drawed
   *
   * @param lottery
   */
  private addDraws(lottery: LotteryModel): LotteryModel {
    const draws: DrawModel[] = [];
    if (lottery.numberOfDraws > 0) {
      for (let i = 0; i < lottery.numberOfDraws; i++) {
        const draw: DrawModel = new DrawModel();
        draw.started = false;
        draws.push(draw);
      }
      return lottery;
    } else {
      throw new Error('Cant create order without any draws');
    }
  }

  /**
   * Get a spesific lottery based on its id
   *
   * @param lotteryId
   */
  public getLottery(lotteryId: string) {
    return this.afs.doc<LotteryModel>('lotteries/' + lotteryId).valueChanges();
  }

  /**
   * Update a lotterymodel
   *
   * @param updatedLotteryModel
   */
  public updateLottery(updatedLotteryModel: LotteryModel) {
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
