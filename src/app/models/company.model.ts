import { Address } from "./address.model";
import { Employee } from "./employee.model";

export interface Company{
  companyId :number;
  username:string;
  password:string;
  name:string;
  companyDescription:string;
  cinNumber: string;
  employees:Array<Employee>;
  address:Address;
}
