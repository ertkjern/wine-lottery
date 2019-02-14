import {Timestamp} from '@firebase/firestore-types';
import {ParticipantModel} from './participant.model';
export class LotteryModel {
  id?: string;
  name: string;
  dateTime: Timestamp;
  createdDate: Timestamp;
  description: string;
  numberOfDraws: number;
  userId?: string;
  participants?: ParticipantModel[];
}
