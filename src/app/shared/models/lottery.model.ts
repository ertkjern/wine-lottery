import {Timestamp} from '@firebase/firestore-types';
import {ParticipantModel} from './participant.model';
import {DrawModel} from './draw.model';
export class LotteryModel {
  id?: string;
  name: string;
  dateTime: Timestamp;
  createdDate: Timestamp;
  description: string;
  numberOfDraws: number;
  draws: DrawModel[];
  userId?: string;
  participants?: ParticipantModel[];
}
