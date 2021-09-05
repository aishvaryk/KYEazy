import { Address } from './address.model';

export interface Company {
  companyId: number;
  username: string;
  password: string;
  name: string;
  companyDescription: string;
  cinNumber: string;
  address: Address;
  icon: string;
  numberOfPendingEmployees: number;
  numberOfRejectedEmployees: number;
  numberOfAcceptedEmployees: number;
  numberOfRegisteredEmployees: number;
  numberOfReportedEmployees: number;
  numberOfTotalEmployees: number;
}
