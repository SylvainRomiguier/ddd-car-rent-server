import { Customer } from "../../../domain/entities/Customer";

export interface ICustomerInputPort {
  handle: (customer: Customer) => void;
}
