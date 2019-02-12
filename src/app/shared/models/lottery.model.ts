import {TicketModel} from './ticket.model';

export class LotteryModel {
  id?: string;
  dateTime: string;
  description: string;
  userId?: string;
  tickets?: TicketModel[];
}
