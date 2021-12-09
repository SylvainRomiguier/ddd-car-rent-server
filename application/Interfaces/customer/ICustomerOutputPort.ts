import { Customer } from "../../../domain/entities/Customer";

export interface ICustomerOutputPort {
  present: (customer: Customer) => void;
}
