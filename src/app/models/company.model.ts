import { Address } from "./address.model";

export interface Company{
  companyId :number;
  username:string;
  password:string;
  name:string;
  companyDescription:string;
  cinNumber: string;
  address:Address;
}
