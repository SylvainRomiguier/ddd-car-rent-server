import { Customer } from "../../../domain/entities/Customer";

export interface ICustomerRepository {
  create: (customer: Customer) => Promise<void>;
  update: (customer: Customer) => Promise<void>;
  getById: (id: string) => Promise<Customer>;
}
