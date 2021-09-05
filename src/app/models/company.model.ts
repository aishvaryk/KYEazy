import { Address } from './address.model';

export interface Company {
  companyId: number;
  username: string;
  password: string;
  name: string;
  companyDescription: string;
  cinNumber: string;
  address: Address;
  numberOfPendingEmployees: number;
  numberOfRejectedEmployees: number;
  numberOfAcceptedEmployees: number;
  numberOfTotalEmployees: number;
  coins:number
}
