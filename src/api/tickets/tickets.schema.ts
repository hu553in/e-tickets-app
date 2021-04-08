import { IssueMethod } from '../../constants';

export interface Ticket {
  number: string;
  isAlreadyUsed: boolean;
  issueMethod: IssueMethod;
  issuedAt: Date;
  updatedAt: Date;
}
